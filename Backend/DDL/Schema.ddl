-- Creating Database
CREATE SCHEMA IF NOT EXISTS mPat;
-- Choosing Database
USE mPat;
-- Creating Organisation Table
CREATE TABLE IF NOT EXISTS Organisation (
    -- Allow max possible range to 'Id' with 'BIGINT' = -2^63 - 2^(63)-1
    Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	 -- UNIQUE KEY cannot be specified as TINYTEXT, TEXT, MEDIUMTEXT or LONGTEXT
	 -- a specified LENGTH is required. 'VARCHAR(255)' is required for such fields
    RegistrationNr VARCHAR(255) NOT NULL,
    -- Used for retriving data (departments) for a specific user (organisation) in front-end
    Token VARCHAR(255) NULL,
    Name TINYTEXT NOT NULL,
    PassKey TINYTEXT NOT NULL,
    LastLogIn DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY RegistrationNr (RegistrationNr),
    UNIQUE KEY Token (Token)
);
-- Creating Department Table
CREATE TABLE IF NOT EXISTS Department (
    -- Allow max possible range to 'Id' with 'BIGINT' = -2^63 - 2^(63)-1
    Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    OrganisationId BIGINT NOT NULL,
    Name TINYTEXT NOT NULL,
    WIPThreshold INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Creating Patient Table
CREATE TABLE IF NOT EXISTS Patient (
	-- Allow max possible range to 'Id' with 'BIGINT' = -2^63 - 2^(62)-1
	Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DepartmentId BIGINT NOT NULL,
	FirstName TINYTEXT NOT NULL,
	LastName TINYTEXT NOT NULL,
	Details LONGTEXT,
	IsWIP BOOLEAN NOT NULL,
	Priority TINYTEXT NOT NULL,
	CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);