

# Cridaa Booking App

Full-stack booking application for court slots. 

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite  
- **Backend**: Node.js, Express, JSON file (DB)  

## Features
- View available time slots per court
- Select and book a slot (updates availability)
- Responsive mobile-first UI

## Quick Setup

### Backend
cd backend
npm install
npm run dev  # http://localhost:4000

## Frontend
cd frontend
npm install
npm run dev  # http://localhost:5173


API ENDPOINTS


| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| GET    | /api/slots      | Fetch available slots |
| POST   | /api/login      | Login (JWT)           |
| POST   | /api/slots/book | Book slot (protected) |


FOLDER STRUCTURE 

├── backend/     # Node.js + Express API
├── frontend/    # React + Tailwind UI
└── README.md

CHALLENGES:

Used JSON file as DB for simplicity (easy to swap with MongoDB).
Rest it is basic application.

