#!/bin/sh
set -e

if [ -f "/database/generateDB.py" ]; then
  echo "Populating database with recipes...."
  cd /database
  python generateDB.py || echo "generateDB.py failed, continuing..."
  cd /app
fi

echo "Starting backend..."
exec "$@"
