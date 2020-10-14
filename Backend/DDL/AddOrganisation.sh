#This script is provided only for the use of project developer
#This script adds new organsation to the database allowing the new organisation to
#access the plattform and its features

#parameters
USER=$1
PASS=$2
DB=$3
REG_NR=$4
ORG_NAME=$5
PASSKEY=$6
#HERE-DOC to pass mysql command
#Password is being hashed by SHA-256 (Hash Funktion)
./mysql -u $USER -p$PASS $DB << EOF
INSERT INTO Organisation (
    RegistrationNr,
    Name,
    PassKey
)
VALUES (
    "$REG_NR",
    "$ORG_NAME",
    SHA2("$PASSKEY", 256)
);
EOF
