import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Generator
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

def get_db() -> Generator:
    """
    Dependency Injection để cung cấp Database Connection cho các API.
    Tự động quản lý vòng đời (mở/đóng) của connection.
    """
    conn = None
    try:
        conn = psycopg2.connect(
            host=os.getenv("POSTGRES_HOST", "127.0.0.1"),
            port=os.getenv("POSTGRES_PORT", "5433"),
            database=os.getenv("POSTGRES_DB"),
            user=os.getenv("POSTGRES_USER"),
            password=os.getenv("POSTGRES_PASSWORD"),
            cursor_factory=RealDictCursor  # Luôn trả về dạng Dict chuẩn JSON
        )
        yield conn
    except psycopg2.Error as e:
        logger.error(f"Lỗi kết nối Database: {e}")
        raise
    finally:
        if conn is not None:
            conn.close()