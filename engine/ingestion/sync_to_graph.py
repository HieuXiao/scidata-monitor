"""
SciData Monitor - Graph Synchronization Engine
Author: Ngo Minh Hieu
Description: Synchronizes research metadata from PostgreSQL to Neo4j Graph Database
             to enable network analysis.
"""

import os
import logging
import psycopg2
from neo4j import GraphDatabase
from dotenv import load_dotenv

# Standard Logging Configuration
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("GraphSync")

load_dotenv()


class GraphSynchronizer:
    def __init__(self):
        """Initialize database connections for Postgres and Neo4j."""
        # Postgres Config
        self.pg_config = {
            "host": "127.0.0.1",
            "port": "5433",
            "database": os.getenv("POSTGRES_DB"),
            "user": os.getenv("POSTGRES_USER"),
            "password": os.getenv("POSTGRES_PASSWORD"),
        }

        # Neo4j Config
        self.neo4j_uri = "bolt://localhost:7687"
        self.neo4j_user = "neo4j"
        self.neo4j_password = os.getenv("NEO4J_PASSWORD", "password123")
        self.driver = GraphDatabase.driver(
            self.neo4j_uri, auth=(self.neo4j_user, self.neo4j_password)
        )

    def close(self):
        """Close Neo4j driver connection."""
        self.driver.close()

    def fetch_pg_data(self):
        """Fetch all papers and authors with their relations from PostgreSQL."""
        query = """
        SELECT
            p.title, p.doi, a.full_name
        FROM papers p
        JOIN paper_authors pa ON p.id = pa.paper_id
        JOIN authors a ON a.id = pa.author_id
        """
        conn = psycopg2.connect(**self.pg_config)
        try:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(query)
                    return cur.fetchall()
        finally:
            conn.close()

    def sync(self):
        """Sync data to Neo4j using Cypher queries."""
        data = self.fetch_pg_data()
        if not data:
            logger.warning("No data found in PostgreSQL to sync.")
            return

        with self.driver.session() as session:
            for title, doi, author_name in data:
                # Cypher query to create nodes and relationships
                # MERGE ensures no duplicate nodes are created
                cypher = """
                MERGE (p:Paper {doi: $doi})
                SET p.title = $title
                MERGE (a:Author {name: $author_name})
                MERGE (a)-[:WROTE]->(p)
                """
                session.run(cypher, title=title, doi=doi, author_name=author_name)

        logger.info(f"Successfully synchronized {len(data)} relationships to Neo4j.")


if __name__ == "__main__":
    sync_engine = GraphSynchronizer()
    try:
        sync_engine.sync()
    finally:
        sync_engine.close()
