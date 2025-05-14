# 📝 Task Manager Web Application

A full-stack Task Manager app built using **HTML, CSS, JavaScript (Frontend)** and **Node.js, Express, MySQL (Backend)**.

---

## 🚀 Features

- Add, view, complete, and delete tasks
- Track real-time task statistics (Completed vs Pending)
- Responsive design with clean UI
- Interactive Pie Chart using Chart.js

---

## 📦 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Charting:** Chart.js

---

## ✅ Prerequisites

- Node.js and npm installed
- MySQL installed and running

---

## 🛠️ Setup Instructions

### 1. Database Setup

Open MySQL (Workbench / CLI / any GUI), then run:

```sql
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
