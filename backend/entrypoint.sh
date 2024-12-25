#!/bin/sh

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
until nc -z mysql 3306; do
  echo "MySQL is still unavailable - sleeping until it turns on"
  sleep 2
done
echo "MySQL is up - proceeding"

# Check migration status and capture the output
echo "Checking migration status..."
STATUS=$(npx sequelize-cli db:migrate:status | grep 'down')

# If there are any pending migrations, apply them
if [ -n "$STATUS" ]; then
  echo "Pending migrations found. Running migrations..."
  npx sequelize-cli db:migrate
else
  echo "No pending migrations. Skipping migration step."
fi

echo "Starting the Node.js app..."
exec nodemon --legacy-watch src/index.js
