import logging
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from psycopg2.extensions import connection

from ..db.session import get_db
from ..models.dashboard import DashboardSummaryResponse
from ..models.paper import PaperResponse  # <-- ĐÂY LÀ DÒNG BẠN BỊ THIẾU

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get(
    "/summary",
    response_model=DashboardSummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Lấy dữ liệu tổng quan Dashboard",
    description="Trả về các chỉ số chính (Metrics) phục vụ cho 4 thẻ thống kê trên màn hình chính."
)
def get_metrics_summary(db: connection = Depends(get_db)) -> Any:
    try:
        with db.cursor() as cur:
            cur.execute("SELECT count(*) as total FROM papers;")
            total_papers = cur.fetchone()["total"]
            
            cur.execute("SELECT count(*) as total FROM authors;")
            total_authors = cur.fetchone()["total"]
            
            return DashboardSummaryResponse(
                total_papers=total_papers,
                total_authors=total_authors,
                avg_collaborations=2.5,          # Mock data
                trending_topic="Radiogenomics"   # Mock data
            )
            
    except Exception as e:
        logger.error(f"Lỗi truy vấn Database tại /summary: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Đã xảy ra lỗi hệ thống khi tính toán dữ liệu thống kê."
        )

@router.get(
    "/recent-activity",
    response_model=List[PaperResponse],
    status_code=status.HTTP_200_OK,
    summary="Lấy 5 bài báo mới nhất cho Dashboard"
)
def get_recent_activity(db: connection = Depends(get_db)) -> Any:
    try:
        with db.cursor() as cur:
            cur.execute("SELECT id, title, doi, abstract FROM papers ORDER BY id DESC LIMIT 5")
            recent_papers = cur.fetchall()
            
            # Ép kiểu dữ liệu UUID thành string để khớp với Model PaperResponse
            results = []
            for paper in recent_papers:
                paper["id"] = str(paper["id"])
                results.append(paper)
                
            return results
    except Exception as e:
        logger.error(f"Lỗi truy vấn Recent Activity: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Lỗi hệ thống khi lấy hoạt động gần đây."
        )