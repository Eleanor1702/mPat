-- Creating Database
CREATE SCHEMA IF NOT EXISTS PatWaiting;
-- Choosing Database
USE PatWaiting;
-- Creating Table
CREATE TABLE IF NOT EXISTS Organisation (
    -- Allow max possible range to 'Id' with 'BIGINT' = -2^63 - 2^(63)-1
    Id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    RegistrationNr VARCHAR(255) NOT NULL,
    -- Used for data pulling in front end (to recognize organisation)
    Token VARCHAR(255) NULL,
    Name TINYTEXT NOT NULL,
    PassKey TINYTEXT NOT NULL,
    LastLogIn DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY RegistrationNr (RegistrationNr),
    UNIQUE KEY Token (Token)
)