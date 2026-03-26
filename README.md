# JobSpark Platform

JobSpark is a modern, full-stack job board platform featuring a built-in AI Career Assistant that helps candidates navigate their job search and write professional emails. It includes custom dashboards for both companies (to post jobs) and candidates (to apply and track applications).

## Tech Stack Overview

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Architecture**: Radix UI Primitives & shadcn/ui inspired components
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`) via Next.js Route Handlers

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Authentication**: JWT (JSON Web Tokens) with `python-jose` and `passlib` for password hashing

---

## Running the Project Locally

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- PostgreSQL installed and running

### 1. Backend Setup
Navigate to the root directory and create a virtual environment:
```bash
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

Install the dependencies:
```bash
pip install -r requirements.txt
```

Set up your `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost/jobboard
SECRET_KEY=your_super_secret_jwt_key
ALGORITHM=HS256
TOKEN_EXPIRE_MINUTES=30
```

Run the backend server:
```bash
uvicorn main:app --reload
```
The backend API will run on `http://127.0.0.1:8000`.

### 2. Frontend Setup
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Set up your `.env.local` file inside the `frontend` directory to enable the AI features:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Run the frontend server:
```bash
npm run dev
```
The application will run on `http://localhost:3000`.

---

## Features
- **Job Discoverability**: Comprehensive search and filtering for job listings.
- **AI Career Assistant**: A floating chat assistant that guides applicants via the Gemini 2.5 AI model. It automatically reviews your application completely before you apply.
- **Role-Based Dashboards**: Real-time mock dashboards representing applicant progression and company job management.
- **Authentication**: Secure JWT-based backend flow.

## API Documentation
Once the backend is running, you can access the interactive Swagger documentation provided automatically by FastAPI at:
- `http://127.0.0.1:8000/docs`
