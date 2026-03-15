from pydantic import BaseModel, Field

class DashboardSummaryResponse(BaseModel):
    total_papers: int = Field(
        ..., 
        description="Tổng số bài báo khoa học đã được thu thập", 
        example=1542
    )
    total_authors: int = Field(
        ..., 
        description="Tổng số tác giả tham gia nghiên cứu", 
        example=320
    )
    avg_collaborations: float = Field(
        ..., 
        description="Tỉ lệ trung bình các nhà nghiên cứu cùng viết một bài báo", 
        example=2.5
    )
    trending_topic: str = Field(
        ..., 
        description="Chủ đề đang được quan tâm nhiều nhất", 
        example="Radiogenomics"
    )