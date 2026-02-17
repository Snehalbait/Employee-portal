# Employee Portal - New Frontend

This is a new React frontend implementation that uses the backend routing API to manage route permissions.

## Features

- **Role-based routing**: Routes are fetched from backend API (`/api/employees/routes`)
- **HR users**: Can access Home page and Add Employee page
- **Employee users**: Can only access Home page (no Add Employee button or route access)
- **Protected routes**: Routes are protected based on backend API response

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Backend API

Make sure the backend is running on `http://localhost:5000` and the following endpoints are available:

- `POST /api/employees/login` - Login endpoint
- `GET /api/employees/routes` - Get accessible routes (requires authentication)
- `POST /api/employees/employees` - Add new employee (requires authentication)

## How It Works

1. User logs in → Token is saved
2. On login success → Frontend calls `/api/employees/routes` to get allowed routes
3. Routes are stored in Redux state
4. Home page checks `accessibleRoutes` to show/hide "Add Employee" button
5. Route guards check `accessibleRoutes` before allowing access to protected routes
