#!/bin/bash

# Repository Backup Script
# This script creates a compressed backup of the repository

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="$(basename "$SCRIPT_DIR")"

# Default backup directory (parent directory of the repository)
BACKUP_DIR="${BACKUP_DIR:-$(dirname "$SCRIPT_DIR")/backups}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="${REPO_NAME}_backup_${TIMESTAMP}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Repository Backup Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Repository:${NC} $REPO_NAME"
echo -e "${YELLOW}Backup Directory:${NC} $BACKUP_DIR"
echo -e "${YELLOW}Backup Name:${NC} $BACKUP_NAME"
echo ""

# Check if we're in a git repository
if [ ! -d "$SCRIPT_DIR/.git" ]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

# Create the backup
echo -e "${YELLOW}Creating backup...${NC}"

# Change to parent directory
cd "$(dirname "$SCRIPT_DIR")" || exit 1

# Create tar.gz archive excluding node_modules and .next
tar -czf "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.cache' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    "$REPO_NAME" 2>/dev/null

if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" | cut -f1)
    echo -e "${GREEN}✓ Backup created successfully!${NC}"
    echo -e "${YELLOW}Location:${NC} $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
    echo -e "${YELLOW}Size:${NC} $BACKUP_SIZE"
    echo ""
    
    # List recent backups
    echo -e "${YELLOW}Recent backups in $BACKUP_DIR:${NC}"
    ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -5 | awk '{print "  " $9 " (" $5 ")"}'
    echo ""
    echo -e "${GREEN}========================================${NC}"
else
    echo -e "${RED}✗ Backup failed!${NC}"
    exit 1
fi
