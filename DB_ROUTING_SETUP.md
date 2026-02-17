# Database Routing Setup Instructions

This document explains how to set up database-driven routing for the Employee Portal.

## Steps to Execute

### 1. Execute the SQL Script

Run the `db-routing-changes.sql` file in SQL Server Management Studio (SSMS) or your SQL Server client:

```sql
-- Open and execute: db-routing-changes.sql
```

**What the script does:**
- Creates `Routes` table to store available routes
- Creates `RoleRoutes` table to map roles to routes
- Inserts default routes (`/home` and `/add-employee`)
- Maps HR role to both routes
- Maps EMPLOYEE role to only `/home` route
- Creates stored procedure `usp_GetRoutesByRole` to fetch routes by role

### 2. Verify the Setup

After executing, you can test the stored procedure:

```sql
-- Test HR routes (should return both /home and /add-employee)
EXEC [dbo].[usp_GetRoutesByRole] @Role = 'HR'

-- Test EMPLOYEE routes (should return only /home)
EXEC [dbo].[usp_GetRoutesByRole] @Role = 'EMPLOYEE'
```

### 3. Database Schema

#### Routes Table
- `Id` (int, PK) - Primary key
- `Path` (nvarchar(200)) - Route path (e.g., '/home', '/add-employee')
- `Label` (nvarchar(100)) - Display label
- `IsActive` (bit) - Whether route is active
- `CreatedAt` (datetime) - Creation timestamp

#### RoleRoutes Table
- `Id` (int, PK) - Primary key
- `Role` (nvarchar(20)) - Role name (HR, EMPLOYEE)
- `RouteId` (int, FK) - Foreign key to Routes table
- `IsActive` (bit) - Whether mapping is active
- `CreatedAt` (datetime) - Creation timestamp

### 4. Adding New Routes (Optional)

To add a new route in the future:

```sql
-- 1. Insert new route
INSERT INTO [dbo].[Routes] ([Path], [Label], [IsActive])
VALUES ('/new-route', 'New Route Label', 1)

-- 2. Get the RouteId
DECLARE @NewRouteId INT = SCOPE_IDENTITY()

-- 3. Map role to route
INSERT INTO [dbo].[RoleRoutes] ([Role], [RouteId], [IsActive])
VALUES ('HR', @NewRouteId, 1)
```

### 5. Backend Changes

The backend has been updated to use the stored procedure:
- `employee.service.js` - Added `getRoutesByRole()` method
- `employee.controller.js` - Updated `getAccessibleRoutes()` to use DB instead of hardcoded routes

### 6. Frontend

The frontend in `frontend-new/` folder already uses the backend API endpoint:
- `GET /api/employees/routes` - Returns routes based on user's role from database

## Current Route Permissions

| Role     | Routes                    |
|----------|---------------------------|
| HR       | `/home`, `/add-employee`  |
| EMPLOYEE | `/home`                   |

## Troubleshooting

If routes are not showing correctly:

1. **Check if tables exist:**
   ```sql
   SELECT * FROM [dbo].[Routes]
   SELECT * FROM [dbo].[RoleRoutes]
   ```

2. **Verify stored procedure exists:**
   ```sql
   SELECT * FROM sys.procedures WHERE name = 'usp_GetRoutesByRole'
   ```

3. **Check role mappings:**
   ```sql
   SELECT rr.Role, r.Path, r.Label
   FROM [dbo].[RoleRoutes] rr
   INNER JOIN [dbo].[Routes] r ON rr.RouteId = r.Id
   WHERE rr.IsActive = 1 AND r.IsActive = 1
   ```

4. **Test stored procedure directly:**
   ```sql
   EXEC [dbo].[usp_GetRoutesByRole] @Role = 'HR'
   ```
