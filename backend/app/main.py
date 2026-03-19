from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.connection import init_pool, close_pool
from app.api.v1.waitlist import router as waitlist_router
from app.api.v1.demo import router as demo_router, compat_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    await init_pool()
    yield
    await close_pool()


app = FastAPI(
    title="CREO API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}



# Versioned API routes
app.include_router(waitlist_router, prefix="/api/v1")
app.include_router(demo_router, prefix="/api/v1")

# Frontend compatibility route (POST /analyze)
app.include_router(compat_router)
