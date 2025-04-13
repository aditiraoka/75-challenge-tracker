# 🎯 75-challenge-tracker
 A custom desktop app to track habits, weight, and journaling for a 75-day challenge. Built with Electron, Next.js, Node.js &amp; SQLite. Features include daily tracking, reminders, streaks, journaling, and data export. Designed for personal growth and learning full-stack desktop app dev.

### Built using:
- Electron for desktop packaging
- Next.js (React + Tailwind) for UI
- Express.js for API
- Prisma + SQLite for local database


---

You can find my notion page to track this project [here](https://mercurial-ship-634.notion.site/1cd7f931f7c780be8e55c1a5cee9b366?v=1cd7f931f7c780ea8847000c518fb3b8&pvs=4).

To learn more about 75 hard challenge, checkout [this website](https://andyfrisella.com/pages/75hard-info).

### 📁 Initial Project Structure
<details>
  <summary>Expand for the folder structure</summary>
  
```bash
75-day-tracker/
├── electron/             # Electron main process
│   └── main.js
├── frontend/src
│   ├── app/
│   │   ├── page.tsx               # Home page
│   │   ├── layout.tsx             # Root layout
│   │   └── log/[id]               
│   │        └── page.tsx
│   ├── components/                # Reusable UI components
│   │   ├── AddDailyLogForm.tsx    # Component for showing details and editing tasks of a day
│   │   ├── DayCard.tsx            # Wraps one day and its tasks
│   │   └── Header.tsx             # Optional header component
│   ├── lib/                       # Utility functions (API calls, helpers)
│   │   └── api.ts                 # Fetch functions to call backend
│   ├── types/                     # All TypeScript interfaces & types
│   │   └── index.ts
│   ├── styles/                    # Global and component styles (if needed)
│   │    └── globals.css
│   ├── constants/                  # Static constants if needed
│   │    └── index.ts
├── backend/              # Express server
│   ├── controllers
│   │    └── taskContoller.js
│   ├── routes
│   │    └── tasks.js
│   ├── prisma/
│   │    └── schema.prisma
│   ├── index.js
│   ├── package.json
│   ├── nodemon.json   
├── public/               # Static assets
├── package.json          # Root package (Electron bootstrapper)
├── .gitignore
└── README.md
```
</details>

## 🚀 Getting Started (Dev)
0. Download the project
1. Install Dependencies:
```bash
npm install
```
2. Initialize Prisma + DB:
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio # optional: inspect DB
```
3. From the root directory, start all services:
```bash
npm run dev
```
This runs:
- Electron app
- Next.js frontend at localhost:3000
- Express backend at localhost:5000
- Electron loads the frontend and connects to backend automatically.

### 🧪 Dev Scripts That Are Run
```bash
npm run dev         # Run everything (Electron + Frontend + Backend)
npm run dev:fe      # Run frontend only
npm run dev:be      # Run backend only
npm run dev:electron # Run Electron only
```

## 🙇‍♂️ Developer Notes

* Remember to restart backend if you edit Prisma schema.
* Add .env if using custom ports or databases.
* All routes are in /backend/routes/.

## 📦 Building for Production (TBD)

This will be updated in a future sprint.

## 📘 License

MIT © Aditirao Arunkumar Kalanji