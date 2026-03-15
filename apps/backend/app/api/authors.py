import logging
from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from psycopg2.extensions import connection

from ..db.session import get_db
from ..models.author import AuthorResponse

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get(
    "",
    response_model=List[AuthorResponse],
    status_code=status.HTTP_200_OK,
    summary="Lấy danh sách các tác giả hàng đầu"
)
def get_top_authors(limit: int = 10, db: connection = Depends(get_db)) -> Any:
    try:
        with db.cursor() as cur:
            # JOIN 3 bảng để đếm số bài báo của mỗi tác giả
            query = """
                SELECT a.id, a.full_name as name, COUNT(pa.paper_id) as paper_count 
                FROM authors a
                JOIN paper_authors pa ON a.id = pa.author_id
                GROUP BY a.id, a.full_name
                ORDER BY paper_count DESC
                LIMIT %s
            """
            cur.execute(query, (limit,))
            authors = cur.fetchall()
            
            # Gán thêm dữ liệu mock cho các tính năng chưa làm (neo4j, topic modeling)
            results = []
            for row in authors:
                results.append(AuthorResponse(
                    id=row["id"],
                    name=row["name"],
                    paper_count=row["paper_count"],
                    collaborations=12,  # Sẽ query từ Neo4j sau
                    main_topic="AI in Healthcare" # Sẽ lấy từ BERTopic sau
                ))
            return results
            
    except Exception as e:
        logger.error(f"Lỗi khi get_top_authors: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Không thể lấy danh sách tác giả."
        )