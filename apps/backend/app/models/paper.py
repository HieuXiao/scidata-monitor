from pydantic import BaseModel, Field
from typing import List, Optional

class PaperResponse(BaseModel):
    id: str = Field(..., description="ID nội bộ của bài báo (UUID)")
    title: str = Field(..., description="Tiêu đề bài báo")
    doi: str = Field(..., description="Mã định danh DOI")
    abstract: Optional[str] = Field(None, description="Tóm tắt nội dung (Abstract)")
    authors: Optional[List[str]] = Field(default=[], description="Danh sách tên tác giả")
    topic: Optional[str] = Field("Data Science", description="Chủ đề phân loại")
    published_date: Optional[str] = Field(None, description="Ngày xuất bản")

class PaperListResponse(BaseModel):
    total: int = Field(..., description="Tổng số bài báo khớp với điều kiện tìm kiếm")
    items: List[PaperResponse] = Field(..., description="Danh sách bài báo của trang hiện tại")