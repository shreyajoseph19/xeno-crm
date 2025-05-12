# xeno-crm

#  CRM – Final Project Setup

This project includes:

- 🌐 Frontend: React + Tailwind + Vite
- ⚙️ Backend: Node.js + Express (with dummy JSON data)
- 🎨 UI: Pastel theme with Poppins font
- ✅ Features: Dashboard, CRUD, Tabs, Insights, Status Badges

---

## 📁 Folder Structure

```
pluto_final_project/
├── pluto_final_frontend/
└── pluto_final_backend/
```

---

## 🚀 How to Run

### 1. Frontend Setup

```bash
cd pluto_final_frontend
npm install
npm run dev
```

> Opens at: http://localhost:5173/

If you'd prefer `npm start`, add this to `package.json` under `"scripts"`:

```json
"scripts": {
  "start": "vite",
  "dev": "vite"
}
```

---

### 2. Backend Setup

```bash
cd pluto_final_backend
npm install
npm start
```

> Runs on: http://localhost:5000/

Make sure your `package.json` has:

```json
"scripts": {
  "start": "node server.js"
}
```

---

## ✅ Features Included

- Sidebar with icons and navigation
- Dashboard with tabs (Orders, Clients, etc.)
- Recharts graph (for insights)
- Tables with status badges
- CRUD operations using Express routes
