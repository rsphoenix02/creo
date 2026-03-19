from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from app.db.connection import get_pool

router = APIRouter(prefix="/waitlist", tags=["waitlist"])


class WaitlistRequest(BaseModel):
    email: EmailStr
    source: str = "landing"


class WaitlistResponse(BaseModel):
    success: bool
    message: str


class WaitlistCountResponse(BaseModel):
    count: int


@router.post("", response_model=WaitlistResponse)
async def join_waitlist(body: WaitlistRequest) -> WaitlistResponse:
    pool = get_pool()
    async with pool.acquire() as conn:
        await conn.execute(
            """
            INSERT INTO waitlist (email, source)
            VALUES ($1, $2)
            ON CONFLICT (email) DO NOTHING
            """,
            body.email,
            body.source,
        )
    return WaitlistResponse(success=True, message="You're on the list!")


@router.get("/count", response_model=WaitlistCountResponse)
async def waitlist_count() -> WaitlistCountResponse:
    pool = get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("SELECT COUNT(*) AS cnt FROM waitlist")
        count = row["cnt"] if row else 0
    return WaitlistCountResponse(count=count)
