<div id="header" align="center">
  <h2>🚘 Vehicle Diagnostics & Configuration Dashboard</h2>
</div>

#### 📘 Scenario
Your are part of an automotive platform team building a diagnostics dashboard for connected vehicles. Your task is to create a minimal fullstack application that:
- Accepts log file input from a diagnostic tool
- Parses and stores relavant entries on the backend
- Displays vehicle diagnostic data on the frontend
- Allows basic searching and filtering
- Demonstrates clean architecture and team-level thinking

#### 🎯 Objective
Build a mini fullstack system that:
1. Processes diagnostic logs in a structured format
2. Exposes a REST API for querying the data
3. Provides a frontend dashboard to display and filter results

#### 🔧 Requirements
##### 📋 Frontend (Angular)
- Angular 15+ application
- A search panel (form) with fields like:
  - Vehicle ID
  - Error code
  - Timestamp range
- A **table view** to show matching log entries
- State management with **NgRx**
- Reusable Components
- Clean UX, responsiveness,and accessibility

##### 🗄️ Backend (Node.js + TypeScript)
- Use **NestJS**
- Parse a given diagnostic log file:
`[2025-07-24 14:21:08] [VEHICLE_ID:1234] [ERROR] [CODE:U0420] [Steering angle sensor malfunction]`
- Store entries in memory or file-based DB(e.g.,lowdb, SQLite)
- REST APIs:
  - `GET /logs?vehicle=1234`
  - `GET /logs?code=U0420`
  - `GET /logs?from=...&to=...`
- Input validation & error handling

#### 🗒 Deliverables
- Source code: GitHub repo
- README including: