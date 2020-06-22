-- Creating Database
CREATE SCHEMA IF NOT EXISTS mPat;
-- Choosing Database
USE mPat;
-- Creating Organisation Table
CREATE TABLE IF NOT EXISTS Organisation (
    -- Allow max possible range to 'Id' with 'BIGINT' = -2^63 - 2^(63)-1
    Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    RegistrationNr VARCHAR(255) NOT NULL,
    -- Used for retriving data (departments) in front-end
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