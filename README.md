# JobSpark Platform

> A modern, full-stack AI-powered job board connecting companies and candidates  with a built-in AI Career Assistant.

---

## Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=white)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)
![Python](https://img.shields.io/badge/Python_3.9+-3670A0?style=flat&logo=python&logoColor=ffdd54)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat&logo=sqlalchemy&logoColor=white)

### AI & Auth
![Google Gemini](https://img.shields.io/badge/Google_Gemini_2.5-4285F4?style=flat&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

---

## Features

- **AI Career Assistant** — Floating chat assistant powered by Google Gemini 2.5 Flash. Automatically reviews your full application before submission and helps write professional emails.
- **Role-Based Dashboards** — Separate real-time dashboards for companies (post & manage jobs) and candidates (apply & track applications).
- **Job Discovery** — Advanced search and filtering across all job listings.
- **Secure Authentication** — JWT-based auth with hashed passwords using `passlib`.
- **Interactive API Docs** — Auto-generated Swagger UI via FastAPI.

---

## Project Structure

```
job-board-api/
├── frontend/          # Next.js 16 App Router (TypeScript)
├── models/            # SQLAlchemy database models
├── routers/           # FastAPI route handlers
├── schemas/           # Pydantic request/response schemas
├── auth.py            # JWT authentication logic
├── database.py        # Database connection & session
├── main.py            # FastAPI app entry point
├── seed.py            # Database seeding script
└── requirements.txt   # Python dependencies
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.9+
- PostgreSQL

### Backend

```bash
# Create and activate virtual environment
python3 -m venv env
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL and secret key

# Start the server
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Add your Google Gemini API key

# Start the dev server
npm run dev
```

---

## Environment Variables

### Backend `.env`
```
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
TOKEN_EXPIRE_MINUTES=30
```

### Frontend `.env.local`
```
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## API Documentation

Once the backend is running, visit the interactive Swagger docs at:
```
/docs
```

---

## License

MIT
