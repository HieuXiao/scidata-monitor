import logging
from typing import Optional, Any
from fastapi import APIRouter, Depends, HTTPException, status, Query
from psycopg2.extensions import connection

from ..db.session import get_db
from ..models.paper import PaperResponse, PaperListResponse

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get(
    "",
    response_model=PaperListResponse,
    status_code=status.HTTP_200_OK,
    summary="Lấy danh sách bài báo (có tìm kiếm và phân trang)"
)
def get_papers(
    skip: int = Query(0, ge=0, description="Bỏ qua N kết quả đầu tiên (Dùng cho phân trang)"),
    limit: int = Query(10, ge=1, le=100, description="Số lượng kết quả trên 1 trang (Max 100)"),
    search: Optional[str] = Query(None, description="Từ khóa tìm kiếm trong tiêu đề"),
    db: connection = Depends(get_db)
) -> Any:
    try:
        with db.cursor() as cur:
            # Xây dựng câu query linh hoạt dựa trên có/không có tham số search
            base_query = "FROM papers"
            params = []
            
            if search:
                base_query += " WHERE title ILIKE %s"
                params.append(f"%{search}%")
                
            # Đếm tổng số lượng (Phục vụ vẽ thanh Pagination trên Frontend)
            cur.execute(f"SELECT count(*) as total {base_query}", tuple(params))
            total_items = cur.fetchone()["total"]
            
            # Lấy dữ liệu thực tế
            query = f"SELECT id, title, doi, abstract {base_query} ORDER BY id DESC LIMIT %s OFFSET %s"
            params.extend([limit, skip])
            
            cur.execute(query, tuple(params))
            papers = cur.fetchall()
            
            # TODO: Truy vấn thêm bảng paper_authors để lấy list authors. 
            # (Hiện tại mock authors rỗng để test API trước)
            
            return PaperListResponse(
                total=total_items,
                items=papers
            )
            
    except Exception as e:
        logger.error(f"Lỗi khi get_papers: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Không thể lấy danh sách bài báo."
        )

@router.get(
    "/{paper_id}",
    response_model=PaperResponse,
    summary="Xem chi tiết 1 bài báo theo ID"
)
def get_paper_detail(
    paper_id: str, 
    db: connection = Depends(get_db)
) -> Any:
    try:
        with db.cursor() as cur:
            cur.execute("SELECT id, title, doi, abstract FROM papers WHERE id = %s", (paper_id,))
            paper = cur.fetchone()
            
            if not paper:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Không tìm thấy bài báo với ID {paper_id}"
                )
            return paper
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Lỗi khi get_paper_detail: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Lỗi hệ thống.")