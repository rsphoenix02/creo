import asyncpg

from app.core.config import settings

pool: asyncpg.Pool | None = None

CREATE_TABLES_SQL = """
CREATE TABLE IF NOT EXISTS waitlist (
    id          SERIAL PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    source      TEXT DEFAULT 'landing',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demo_rate_limit (
    ip           TEXT PRIMARY KEY,
    requests     INT DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT NOW()
);
"""


async def init_pool() -> asyncpg.Pool:
    global pool
    pool = await asyncpg.create_pool(
        dsn=settings.database_url,
        min_size=2,
        max_size=10,
    )
    async with pool.acquire() as conn:
        await conn.execute(CREATE_TABLES_SQL)
    return pool


async def close_pool() -> None:
    global pool
    if pool is not None:
        await pool.close()
        pool = None


def get_pool() -> asyncpg.Pool:
    if pool is None:
        raise RuntimeError("Database pool not initialized")
    return pool
