from pydantic import BaseModel, Field
from typing import List

class AuthorResponse(BaseModel):
    id: int = Field(..., description="ID tác giả")
    name: str = Field(..., description="Tên đầy đủ của tác giả", example="John Doe")
    paper_count: int = Field(0, description="Số lượng bài báo đã xuất bản")
    collaborations: int = Field(0, description="Số lượng đồng tác giả")
    main_topic: str = Field("N/A", description="Chủ đề nghiên cứu chính")