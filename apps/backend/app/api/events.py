import logging
from typing import List
from fastapi import APIRouter, status

from ..models.event import LiveEventResponse

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get(
    "/live",
    response_model=List[LiveEventResponse],
    status_code=status.HTTP_200_OK,
    summary="Kiểm tra sự kiện đang phát trực tiếp"
)
def get_live_events():
    """API kiểm tra xem có hội nghị nào đang Live không để hiển thị Banner và Video Player."""
    # Trả về 1 sự kiện Live giả định làm tính năng "Wow factor" cho Portfolio
    return [
        LiveEventResponse(
            id="evt_ai_health_2026",
            title="Global Summit on AI in Healthcare 2026",
            type="conference",
            status="live",
            stream_url="https://www.youtube.com/embed/jfKfPfyJRdk",
            viewers=1024
        )
    ]