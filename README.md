# 🩺 Dr. Aria — Medical Chatbot Frontend

A React frontend for the Dr. Aria Medical Assistant Chatbot API. Patients sign up, log in, and chat privately with an AI medical assistant — with multi-conversation sessions, chat history, AI-generated insights, and document upload (RAG).

> This frontend talks to a separate FastAPI backend. See [medical-chatbot](https://github.com/mano877/medical_chatbot) for the API.

---

## Features

- 🔐 **Authentication** — signup, login, logout (JWT-based, private per-patient data)
- 💬 **Multi-conversation chat**  sidebar with date-grouped conversation history, "New Chat", per-conversation and per-message delete
- 📜 **History**  view and clear your full chat history
- 🔍 **Insights**  AI-generated conversation summary, extracted symptoms, and a "second opinion" analysis
- 📄 **Documents**  upload PDFs (lab reports, prescriptions, guidelines) that Dr. Aria references during chat (RAG), scoped privately per patient
- 🎨 Custom design system  teal/amber medical theme, Space Grotesk + Inter + IBM Plex Mono fonts, animated heartbeat/ECG motif

---

## Tech stack

- **React** + **Vite**
- **react-router-dom** — client-side routing, with a `ProtectedRoute` guard for private pages
- Plain CSS (custom design system, no UI framework)
- Browser `localStorage` for session persistence

---

## Project structure

```
src/
  ├── pages/         Home, Signup, Login, Chat, History, Insights, Documents
  ├── components/     Nav, Spinner, ProtectedRoute
  ├── api/            One file per backend resource (auth, chat, conversations, history, insights, documents, patients)
  ├── App.jsx          Routes + layout
  └── main.jsx
```

Each `api/*.js` file wraps the matching backend endpoints with `fetch`. Protected calls go through `authFetch` (in `api/auth.js`), which attaches the JWT and auto-redirects to `/login` if the token has expired.

---

## Setup

```bash
git clone <this-repo-url>
cd medical-chatbot-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` by default. Requires the backend API running (see backend README) — the frontend expects it at `http://localhost:8000`.

---

## Environment / configuration

The backend base URL is currently hardcoded as `http://localhost:8000` inside each `src/api/*.js` file (`const BASE_URL = ...`). If deploying, update these to your deployed backend URL, or refactor into a `.env` + `import.meta.env.VITE_API_URL`.

---

## Notes

- Built as a learning project — manually coded feature by feature rather than scaffolded/generated.
- No automated tests yet.
- The old "browse all patients" page was removed after authentication was added, since it conflicted with per-patient privacy — each logged-in patient now only ever sees their own data.