"""Small, explicit SQLite migration runner for the local learning project."""
from pathlib import Path
from sqlalchemy import create_engine, event, text
from sqlalchemy.orm import sessionmaker


def database(url: str):
    if not url.startswith("sqlite:"):
        raise ValueError("This local reference uses SQLite. Review migrations before changing database engines.")
    engine = create_engine(url, connect_args={"check_same_thread": False, "timeout": 15})

    @event.listens_for(engine, "connect")
    def sqlite_options(connection, _):
        connection.execute("PRAGMA foreign_keys=ON")
        connection.execute("PRAGMA busy_timeout=15000")

    return engine, sessionmaker(engine, expire_on_commit=False)


def migrate(engine):
    with engine.begin() as connection:
        connection.execute(text("CREATE TABLE IF NOT EXISTS schema_versions (version INTEGER PRIMARY KEY)"))
        applied = set(connection.execute(text("SELECT version FROM schema_versions")).scalars())
        for path in sorted((Path(__file__).parent / "migrations").glob("*.sql")):
            version = int(path.stem.split("_", 1)[0])
            if version in applied:
                continue
            for statement in path.read_text(encoding="utf-8").split(";"):
                if statement.strip():
                    connection.exec_driver_sql(statement)
            connection.execute(text("INSERT INTO schema_versions (version) VALUES (:v)"), {"v": version})
