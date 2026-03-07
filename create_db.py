import sqlite3
import os

os.makedirs("database", exist_ok=True)

conn = sqlite3.connect("database/users.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    password TEXT,
    contact1 TEXT,
    contact2 TEXT
)
""")

conn.commit()
conn.close()

print("Database created successfully")