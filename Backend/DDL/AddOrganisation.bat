:: This script is provided only for the use of project developer
:: This script adds new organsation to the database allowing the new organisation to
:: access the plattform and its features

:: parameters
:: ## USER = %1
:: ## PASS = %2
:: ## DB = %3
:: ## REG_NR = %4
:: ## ORG_NAME = %5
:: ## PASSKEY = %6

:: Password is being hashed by SHA-256 (Hash Funktion)

@echo on
mysql -u %1 -p%2 %3 -e "INSERT INTO Organisation (RegistrationNr,Name,PassKey)VALUES (\"%4\",\"%5\",SHA2(\"%6\", 256));"
