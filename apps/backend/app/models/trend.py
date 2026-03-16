from pydantic import BaseModel, Field
from typing import List

class TimelineData(BaseModel):
    date: str = Field(..., description="Thời gian (YYYY-MM)", example="2025-10")
    count: int = Field(..., description="Số lượng bài báo xuất bản", example=45)

class KeywordData(BaseModel):
    keyword: str = Field(..., description="Từ khóa trích xuất từ Abstract", example="Machine Learning")
    weight: int = Field(..., description="Tần suất xuất hiện (Trọng số)", example=120)