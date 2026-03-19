import json
import logging
from datetime import datetime, timezone

import anthropic
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from app.core.config import settings
from app.db.connection import get_pool

logger = logging.getLogger("uvicorn.error")

router = APIRouter(tags=["demo"])

# Reuse a single AsyncAnthropic client across requests to enable HTTP
# connection pooling and avoid per-request SSL handshake overhead.
_claude_client: anthropic.AsyncAnthropic | None = None


def _get_claude_client() -> anthropic.AsyncAnthropic:
    global _claude_client
    if _claude_client is None:
        _claude_client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    return _claude_client

ANALYSIS_SYSTEM_PROMPT = """You are CREO, an AI ad creative intelligence engine.
Analyze the provided ad copy and return a JSON score report with EXACTLY this structure:
{
  "hook_strength": { "score": <number 0-10>, "reasoning": "<1-2 sentences>", "suggestion": "<1-2 sentences>" },
  "value_proposition": { "score": <number 0-10>, "reasoning": "<1-2 sentences>", "suggestion": "<1-2 sentences>" },
  "copy_flow": { "score": <number 0-10>, "reasoning": "<1-2 sentences>", "suggestion": "<1-2 sentences>" },
  "cta_effectiveness": { "score": <number 0-10>, "reasoning": "<1-2 sentences>", "suggestion": "<1-2 sentences>" },
  "audience_fit": { "score": <number 0-10>, "reasoning": "<1-2 sentences>", "suggestion": "<1-2 sentences>" },
  "overall_score": <number 0-10>,
  "top_improvement": "<1-2 sentences describing the single highest-impact change>"
}
Score 0-10 where 10 is perfect. Be specific in reasoning and suggestions.
Respond ONLY with valid JSON, no markdown fences or extra text."""


class DemoRequest(BaseModel):
    ad_copy: str = Field(min_length=1, max_length=5000)
    platform: str = "meta"


class DimensionScore(BaseModel):
    score: float
    reasoning: str
    suggestion: str


class AnalysisResult(BaseModel):
    hook_strength: DimensionScore
    value_proposition: DimensionScore
    copy_flow: DimensionScore
    cta_effectiveness: DimensionScore
    audience_fit: DimensionScore
    overall_score: float
    top_improvement: str


def _get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _is_localhost(ip: str) -> bool:
    return ip in {"127.0.0.1", "::1", "localhost"} or ip.startswith("127.") or ip == "0:0:0:0:0:0:0:1"


async def _check_rate_limit(ip: str) -> bool:
    """Return True if the request is allowed, False if rate-limited.

    Localhost IPs bypass rate limiting so local development isn't blocked.
    """
    logger.debug(f"[rate-limit] ip={ip!r} is_localhost={_is_localhost(ip)}")
    if _is_localhost(ip):
        return True

    pool = get_pool()
    now = datetime.now(timezone.utc)
    window = settings.demo_rate_limit_window_seconds
    max_requests = settings.demo_rate_limit_requests

    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            "SELECT requests, window_start FROM demo_rate_limit WHERE ip = $1",
            ip,
        )

        if row is None:
            await conn.execute(
                "INSERT INTO demo_rate_limit (ip, requests, window_start) VALUES ($1, 1, $2)",
                ip,
                now,
            )
            return True

        elapsed = (now - row["window_start"]).total_seconds()

        if elapsed > window:
            await conn.execute(
                "UPDATE demo_rate_limit SET requests = 1, window_start = $1 WHERE ip = $2",
                now,
                ip,
            )
            return True

        if row["requests"] >= max_requests:
            return False

        await conn.execute(
            "UPDATE demo_rate_limit SET requests = requests + 1 WHERE ip = $1",
            ip,
        )
        return True


async def _analyze_with_claude(ad_copy: str, platform: str) -> dict:
    client = _get_claude_client()
    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=ANALYSIS_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Platform: {platform}\n\nAd copy:\n{ad_copy}",
            }
        ],
    )
    raw = message.content[0].text
    # Strip markdown fences if present
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
    return json.loads(cleaned)


async def _run_analysis(body: DemoRequest, request: Request, *, wrap: bool) -> JSONResponse:
    """Shared analysis handler for both versioned and compat endpoints."""
    ip = _get_client_ip(request)
    allowed = await _check_rate_limit(ip)

    if not allowed:
        return JSONResponse(
            status_code=429,
            content={
                "error": "rate_limited",
                "message": f"You've used all {settings.demo_rate_limit_requests} free analyses. Sign up for full access.",
            },
        )

    analysis = await _analyze_with_claude(body.ad_copy, body.platform)
    validated = AnalysisResult(**analysis)

    if wrap:
        return JSONResponse(content={"success": True, "analysis": validated.model_dump()})
    return JSONResponse(content=validated.model_dump())


@router.post("/demo")
async def demo_analyze(body: DemoRequest, request: Request) -> JSONResponse:
    return await _run_analysis(body, request, wrap=True)


# Compatibility route: frontend calls POST /analyze (no /api/v1 prefix)
compat_router = APIRouter(tags=["compat"])


@compat_router.post("/analyze")
async def compat_analyze(body: DemoRequest, request: Request) -> JSONResponse:
    """Frontend-compatible endpoint that returns the analysis directly."""
    return await _run_analysis(body, request, wrap=False)
