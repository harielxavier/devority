#!/bin/bash

# Devority Development Startup Script
# This script ensures all necessary services are running before starting the dev server

echo "🚀 Starting Devority Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# 1. Start Prisma Postgres Database (if not running)
echo -e "${YELLOW}Checking Prisma Postgres database...${NC}"
if ! check_port 51213; then
    echo -e "${YELLOW}Starting Prisma Postgres database...${NC}"
    npx prisma dev &
    sleep 5
    echo -e "${GREEN}✓ Prisma Postgres database started${NC}"
else
    echo -e "${GREEN}✓ Prisma Postgres database already running${NC}"
fi

# 2. Generate Prisma Client
echo -e "${YELLOW}Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma client generated${NC}"

# 3. Push database schema
echo -e "${YELLOW}Syncing database schema...${NC}"
npx prisma db push
echo -e "${GREEN}✓ Database schema synced${NC}"

# 4. Clean Next.js cache (optional, uncomment if needed)
# echo -e "${YELLOW}Cleaning Next.js cache...${NC}"
# rm -rf .next
# echo -e "${GREEN}✓ Next.js cache cleaned${NC}"

# 5. Start Next.js development server
echo -e "${GREEN}Starting Next.js development server...${NC}"
echo -e "${YELLOW}Access your site at: http://localhost:3000${NC}"
echo -e "${YELLOW}Admin panel at: http://localhost:3000/admin${NC}"
npm run dev