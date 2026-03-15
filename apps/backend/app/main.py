import logging
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .api import dashboard, papers, authors, trends, events

# Import các Routers
from .api import dashboard
# from .api import papers, authors, trends, events


# 1. CẤU HÌNH LOGGING CHUẨN
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("SciDataAPI")

# 2. KHỞI TẠO APP
app = FastAPI(
    title="SciData Monitor API",
    description="Hệ thống API Backend bảo mật và mở rộng cho nền tảng phân tích học thuật",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 3. CẤU HÌNH BẢO MẬT: CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# 4. CẤU HÌNH BẢO MẬT: GLOBAL ERROR HANDLER
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(f"Unhandled Exception at {request.url.path}: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Lỗi nội bộ máy chủ. Vui lòng liên hệ quản trị viên."},
    )

# 5. ĐĂNG KÝ CÁC MODULES (ROUTING)
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
# app.include_router(papers.router, prefix="/api/v1/papers", tags=["Papers"])
app.include_router(papers.router, prefix="/api/v1/papers", tags=["Papers"])
app.include_router(authors.router, prefix="/api/v1/authors", tags=["Authors"])
app.include_router(trends.router, prefix="/api/v1/trends", tags=["Trends"])
app.include_router(events.router, prefix="/api/v1/events", tags=["Events"])

# 6. HEALTH CHECK (API kiểm tra server có sống không)
@app.get("/health", tags=["System"])
def health_check() -> dict:
    return {"status": "ok", "message": "SciData Monitor API is running securely."}