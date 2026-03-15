"""
SciData Monitor - ArXiv Ingestion Engine
Author: Ngo Minh Hieu
Description: Professional ETL pipeline to fetch academic papers and authors
             from arXiv API and store them in a relational PostgreSQL schema.
"""

import os
import logging
import xml.etree.ElementTree as ET
from typing import Optional, List, Dict, Any

import httpx
import psycopg2
from dotenv import load_dotenv

# Standard Logging Configuration
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("ArxivIngestor")

load_dotenv()


class ArxivIngestor:
    def __init__(self):
        """Initialize connection parameters and API settings."""
        self.db_config = {
            "host": "127.0.0.1",
            "port": "5433",
            "database": os.getenv("POSTGRES_DB"),
            "user": os.getenv("POSTGRES_USER"),
            "password": os.getenv("POSTGRES_PASSWORD"),
            "connect_timeout": 10,
        }
        self.base_url = "https://export.arxiv.org/api/query"
        self.namespaces = {"atom": "http://www.w3.org/2005/Atom"}

    def _get_connection(self):
        """Establish a new PostgreSQL connection."""
        return psycopg2.connect(**self.db_config)

    def fetch_data(self, query: str, max_results: int = 10) -> Optional[str]:
        """Fetch raw XML data from arXiv API."""
        params = {
            "search_query": query,
            "max_results": max_results,
            "sortOrder": "descending",
        }
        try:
            with httpx.Client(timeout=30.0, follow_redirects=True) as client:
                logger.info(f"Connecting to arXiv API for query: '{query}'")
                response = client.get(self.base_url, params=params)
                response.raise_for_status()
                return response.text
        except httpx.HTTPError as e:
            logger.error(f"Network Error: {e}")
            return None

    def _save_to_db(self, papers_data: List[Dict[str, Any]]):
        """Process and commit data to PostgreSQL using atomic transactions."""
        conn = self._get_connection()
        try:
            with conn:
                with conn.cursor() as cur:
                    for paper in papers_data:
                        # 1. Upsert Paper and retrieve UUID
                        cur.execute(
                            """
                            INSERT INTO papers (title, doi, abstract)
                            VALUES (%s, %s, %s)
                            ON CONFLICT (doi) DO UPDATE SET title = EXCLUDED.title
                            RETURNING id;
                            """,
                            (paper["title"], paper["doi"], paper["abstract"]),
                        )
                        paper_id = cur.fetchone()[0]

                        # 2. Process Authors
                        for author_name in paper["authors"]:
                            # Upsert Author with the NEW unique constraint
                            cur.execute(
                                """
                                INSERT INTO authors (full_name)
                                VALUES (%s)
                                ON CONFLICT (full_name) DO NOTHING;
                                """,
                                (author_name,),
                            )

                            # Get the author_id (whether newly created or existing)
                            cur.execute(
                                "SELECT id FROM authors WHERE full_name = %s;",
                                (author_name,),
                            )
                            author_id = cur.fetchone()[0]

                            # 3. Link Paper and Author
                            cur.execute(
                                """
                                INSERT INTO paper_authors (paper_id, author_id)
                                VALUES (%s, %s)
                                ON CONFLICT DO NOTHING;
                                """,
                                (paper_id, author_id),
                            )
            logger.info(f"Success: Synced {len(papers_data)} papers and their authors.")
        except Exception as e:
            logger.error(f"Database Transaction Error: {e}")
            conn.rollback()
        finally:
            conn.close()

    def parse_xml(self, xml_data: str) -> List[Dict[str, Any]]:
        """Parse arXiv XML into structured data."""
        root = ET.fromstring(xml_data)
        results = []
        for entry in root.findall("atom:entry", self.namespaces):
            paper = {
                "title": entry.find("atom:title", self.namespaces)
                .text.strip()
                .replace("\n", " "),
                "doi": entry.find("atom:id", self.namespaces).text.split("/")[-1],
                "abstract": entry.find("atom:summary", self.namespaces).text.strip(),
                "authors": [
                    a.find("atom:name", self.namespaces).text.strip()
                    for a in entry.findall("atom:author", self.namespaces)
                ],
            }
            results.append(paper)
        return results

    def run(self, topic: str, limit: int = 10):
        """Execute ETL process."""
        xml = self.fetch_data(topic, limit)
        if xml:
            data = self.parse_xml(xml)
            self._save_to_db(data)


if __name__ == "__main__":
    ingestor = ArxivIngestor()
    TARGET_TOPICS = [
        "all:healthcare AND all:AI",
        "all:radiogenomics",
        "all:medical imaging",
    ]
    for topic in TARGET_TOPICS:
        ingestor.run(topic, limit=5)
