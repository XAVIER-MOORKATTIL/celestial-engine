# 🌌 Quantum-Observer Geocentric Pipeline

A high-performance full-stack MERN application that processes real-time planetary telemetry over WebSockets while validating cosmic alignment parameters against MongoDB Atlas.

## 🚀 Stack Architecture
* **Frontend:** React + Vite, Socket.io-Client
* **Backend:** Node.js, Express, Socket.io
* **Database:** MongoDB Atlas (M0 Cluster)
* **Hosting:** Render (Backend API/WebSockets) + Vercel (Frontend Static Assets)

## 🛠️ Project Structure
```text
celestial-engine/
├── server/          # Node.js + Express + Socket.io Server
│   ├── .env         # Environment Variables (Git Ignored)
│   ├── .gitignore
│   └── server.js    # Core Backend Entrypoint
└── client/          # React + Vite Frontend
    ├── .gitignore
    ├── src/
    │   └── App.jsx  # Main Dashboard Component
    └── package.json


## ⚙️ Local Setup Instructions
Clone the repository.

Install dependencies in both server/ and client/ folders:

Bash
cd server && npm install
cd ../client && npm install
Configure server/.env with your MongoDB Atlas URI:

Code snippet
PORT=5000
CELESTIAL_DB_URI=your_mongodb_connection_string
DYNAMIC_SECRET_KEY=ORBIT_SECRET_XAVIER_999
Start both servers:

Backend: npx nodemon server.js

Frontend: npm run dev


---

## Step 3: Push to GitHub

Open a terminal at the root directory (`C:\Users\Acer\celestial-engine`) and run:

```bash
# 1. Initialize Git repository
git init

# 2. Add all files to staging
git add .

# 3. Commit changes
git commit -m "feat: initial commit for quantum geocentric engine"

# 4. Rename main branch
git branch -M main

