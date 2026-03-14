# SciData Monitor: Scientific Research Intelligence Platform

SciData Monitor là một nền tảng phân tích dữ liệu nghiên cứu khoa học, tập trung vào việc thu thập và khai phá tri thức từ các ấn phẩm trong lĩnh vực Radiogenomics, AI Healthcare và Genomics. Hệ thống sử dụng kết hợp cơ sở dữ liệu quan hệ, đồ thị và xử lý ngôn ngữ tự nhiên (NLP) để trực quan hóa xu hướng nghiên cứu và mạng lưới cộng tác toàn cầu.

---

## 1. System Architecture

Dự án được thiết kế theo kiến trúc Modular Monorepo nhằm tách biệt quy trình thu thập dữ liệu (Ingestion), xử lý AI (Engine) và giao diện người dùng (Application).

```mermaid
graph TD
    subgraph "Data Sources"
        PubMed[PubMed API]
        ArXiv[ArXiv API]
    end

    subgraph "Data Engine"
        EP[Ingestion Pipeline]
        NLP[NLP Services: NER & Topic Modeling]
        GB[Graph Generator]
    end

    subgraph "Storage Layer"
        PG[(PostgreSQL: Metadata)]
        NJ[(Neo4j: Knowledge Graph)]
    end

    subgraph "Presentation Layer"
        API[FastAPI Gateway]
        UI[React TypeScript Dashboard]
    end

    PubMed & ArXiv --> EP
    EP --> PG
    PG --> NLP & GB
    NLP --> PG
    GB --> NJ
    PG & NJ --> API
    API --> UI