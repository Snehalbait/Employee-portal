USE [EmployeePortal]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Create Routes Table
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Routes]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Routes](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Path] [nvarchar](200) NOT NULL,
        [Label] [nvarchar](100) NOT NULL,
        [IsActive] [bit] NOT NULL DEFAULT(1),
        [CreatedAt] [datetime] NOT NULL DEFAULT(GETDATE()),
        CONSTRAINT [PK_Routes] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [UQ_Routes_Path] UNIQUE NONCLUSTERED ([Path] ASC)
    ) ON [PRIMARY]
END
GO

-- =============================================
-- Create RoleRoutes Table (Junction Table)
-- Maps Roles to Routes
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RoleRoutes]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[RoleRoutes](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [Role] [nvarchar](20) NOT NULL,
        [RouteId] [int] NOT NULL,
        [IsActive] [bit] NOT NULL DEFAULT(1),
        [CreatedAt] [datetime] NOT NULL DEFAULT(GETDATE()),
        CONSTRAINT [PK_RoleRoutes] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_RoleRoutes_Routes] FOREIGN KEY([RouteId]) REFERENCES [dbo].[Routes] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [UQ_RoleRoutes_Role_Route] UNIQUE NONCLUSTERED ([Role] ASC, [RouteId] ASC)
    ) ON [PRIMARY]
END
GO

-- =============================================
-- Insert Default Routes
-- =============================================
-- Insert Home Route (if not exists)
IF NOT EXISTS (SELECT 1 FROM [dbo].[Routes] WHERE [Path] = '/home')
BEGIN
    INSERT INTO [dbo].[Routes] ([Path], [Label], [IsActive])
    VALUES ('/home', 'Home', 1)
END
GO

-- Insert Add Employee Route (if not exists)
IF NOT EXISTS (SELECT 1 FROM [dbo].[Routes] WHERE [Path] = '/add-employee')
BEGIN
    INSERT INTO [dbo].[Routes] ([Path], [Label], [IsActive])
    VALUES ('/add-employee', 'Add Employee', 1)
END
GO

-- =============================================
-- Insert Role-Route Mappings
-- =============================================
-- HR Role: Access to both Home and Add Employee
DECLARE @HomeRouteId INT = (SELECT [Id] FROM [dbo].[Routes] WHERE [Path] = '/home')
DECLARE @AddEmployeeRouteId INT = (SELECT [Id] FROM [dbo].[Routes] WHERE [Path] = '/add-employee')

-- HR -> Home Route
IF NOT EXISTS (SELECT 1 FROM [dbo].[RoleRoutes] WHERE [Role] = 'HR' AND [RouteId] = @HomeRouteId)
BEGIN
    INSERT INTO [dbo].[RoleRoutes] ([Role], [RouteId], [IsActive])
    VALUES ('HR', @HomeRouteId, 1)
END
GO

-- HR -> Add Employee Route
IF NOT EXISTS (SELECT 1 FROM [dbo].[RoleRoutes] WHERE [Role] = 'HR' AND [RouteId] = @AddEmployeeRouteId)
BEGIN
    INSERT INTO [dbo].[RoleRoutes] ([Role], [RouteId], [IsActive])
    VALUES ('HR', @AddEmployeeRouteId, 1)
END
GO

-- EMPLOYEE Role: Access only to Home
DECLARE @HomeRouteIdEmp INT = (SELECT [Id] FROM [dbo].[Routes] WHERE [Path] = '/home')

IF NOT EXISTS (SELECT 1 FROM [dbo].[RoleRoutes] WHERE [Role] = 'EMPLOYEE' AND [RouteId] = @HomeRouteIdEmp)
BEGIN
    INSERT INTO [dbo].[RoleRoutes] ([Role], [RouteId], [IsActive])
    VALUES ('EMPLOYEE', @HomeRouteIdEmp, 1)
END
GO

-- =============================================
-- Create Stored Procedure: Get Routes by Role
-- =============================================
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_GetRoutesByRole]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[usp_GetRoutesByRole]
GO

CREATE PROCEDURE [dbo].[usp_GetRoutesByRole]
    @Role NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        r.[Path],
        r.[Label]
    FROM [dbo].[Routes] r
    INNER JOIN [dbo].[RoleRoutes] rr ON r.[Id] = rr.[RouteId]
    WHERE rr.[Role] = @Role
        AND r.[IsActive] = 1
        AND rr.[IsActive] = 1
    ORDER BY r.[Path]
END
GO

-- =============================================
-- Test the Stored Procedure
-- =============================================
-- Uncomment below to test:
-- EXEC [dbo].[usp_GetRoutesByRole] @Role = 'HR'
-- EXEC [dbo].[usp_GetRoutesByRole] @Role = 'EMPLOYEE'
-- GO
