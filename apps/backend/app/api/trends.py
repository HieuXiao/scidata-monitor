import logging
from typing import List, Optional
from fastapi import APIRouter, Query, status

from ..models.trend import TimelineData, KeywordData

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get(
    "/timeline",
    response_model=List[TimelineData],
    status_code=status.HTTP_200_OK,
    summary="Dữ liệu biểu đồ đường (Timeline)"
)
def get_trends_timeline(
    topic: Optional[str] = Query(None, description="Lọc theo chủ đề cụ thể")
):
    """API trả về dữ liệu Time-series để Frontend vẽ biểu đồ sự phát triển của các chủ đề."""
    # Mock data chuẩn bị sẵn cho Frontend vẽ Chart
    return [
        TimelineData(date="2025-08", count=15),
        TimelineData(date="2025-09", count=28),
        TimelineData(date="2025-10", count=45),
        TimelineData(date="2025-11", count=60),
        TimelineData(date="2025-12", count=85),
    ]

@router.get(
    "/keywords",
    response_model=List[KeywordData],
    status_code=status.HTTP_200_OK,
    summary="Dữ liệu Top Keywords (Word Cloud)"
)
def get_top_keywords(limit: int = Query(10, description="Số lượng từ khóa cần lấy")):
    """API trả về danh sách từ khóa phổ biến nhất phục vụ cho biểu đồ Word Cloud."""
    # Mock data
    return [
        KeywordData(keyword="Deep Learning", weight=150),
        KeywordData(keyword="MRI", weight=120),
        KeywordData(keyword="Genomics", weight=95),
        KeywordData(keyword="Transformer", weight=80),
        KeywordData(keyword="Healthcare AI", weight=65),
    ]