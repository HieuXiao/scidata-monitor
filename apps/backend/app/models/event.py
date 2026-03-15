from pydantic import BaseModel, Field
from typing import Optional

class LiveEventResponse(BaseModel):
    id: str = Field(..., description="Mã sự kiện")
    title: str = Field(..., description="Tên hội nghị/workshop")
    type: str = Field(..., description="Loại sự kiện (conference, workshop, q_a)")
    status: str = Field(..., description="Trạng thái (live, upcoming, ended)")
    stream_url: Optional[str] = Field(None, description="Đường dẫn nhúng Video (YouTube/Zoom)")
    viewers: int = Field(0, description="Số lượng người đang xem")