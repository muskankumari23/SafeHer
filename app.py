from flask import Flask, render_template, request, redirect, session, url_for
import sqlite3
import os
import random

app = Flask(__name__)
app.secret_key = "safeher_secret_key"

DB_PATH = "database/users.db"


def init_db():
    os.makedirs("database", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def get_user_by_email(email):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, name, email, password FROM users WHERE email = ?", (email,))
    user = cur.fetchone()
    conn.close()
    return user


def create_user(name, email, password):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
    conn.commit()
    conn.close()


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/auth", methods=["GET", "POST"])
def auth():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = get_user_by_email(email)

        if user and user[3] == password:
            session["user"] = user[2]
            session["name"] = user[1]
            return redirect(url_for("dashboard"))
        else:
            return render_template("auth.html", error="Invalid email or password", active_tab="email")

    return render_template("auth.html", active_tab="email")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")

        if not name or not email or not password:
            return render_template("signup.html", error="Please fill all fields")

        existing_user = get_user_by_email(email)
        if existing_user:
            return render_template("signup.html", error="Email already exists")

        create_user(name, email, password)
        return render_template("signup.html", success="Account created successfully. Now login.")

    return render_template("signup.html")


@app.route("/send-otp", methods=["POST"])
def send_otp():
    phone = request.form.get("phone")

    if not phone or not phone.isdigit() or len(phone) != 10:
        return render_template("auth.html", error="Enter a valid 10-digit mobile number", active_tab="phone")

    otp = str(random.randint(100000, 999999))
    session["otp"] = otp
    session["phone"] = phone
    session["name"] = "User"

    print(f"Demo OTP for {phone}: {otp}")

    return render_template(
        "auth.html",
        message="OTP sent successfully. Check terminal for demo OTP.",
        active_tab="phone"
    )


@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    entered_otp = request.form.get("otp")

    if entered_otp == session.get("otp"):
        session["user"] = session.get("phone")
        return redirect(url_for("dashboard"))
    else:
        return render_template("auth.html", error="Invalid OTP", active_tab="phone")


@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", username=session.get("name", "User"))


@app.route("/terms")
def terms():
    return render_template("terms.html")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
    