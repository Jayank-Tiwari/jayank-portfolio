# Repository Backup Guide

This document provides comprehensive information about backing up and restoring the Jayank Portfolio repository.

## Overview

The repository includes multiple backup methods:

1. **Local Backup Script** - Manual backups on your local machine
2. **GitHub Actions Workflow** - Automated backups via GitHub Actions

## Method 1: Local Backup Script

### Creating a Backup

The `backup.sh` script creates a compressed archive of the repository.

#### Basic Usage

```bash
./backup.sh
```

This creates a backup in `../backups/` directory with a timestamp.

#### Custom Backup Location

Specify a custom directory:

```bash
BACKUP_DIR=/path/to/your/backup/folder ./backup.sh
```

#### Example Output

```
========================================
Repository Backup Script
========================================

Repository: jayank-portfolio
Backup Directory: /home/user/backups
Backup Name: jayank-portfolio_backup_20231117_143022

Creating backup...
✓ Backup created successfully!
Location: /home/user/backups/jayank-portfolio_backup_20231117_143022.tar.gz
Size: 320K

Recent backups in /home/user/backups:
  jayank-portfolio_backup_20231117_143022.tar.gz (320K)
  jayank-portfolio_backup_20231115_120000.tar.gz (318K)

========================================
```

### What's Included in the Backup

The backup includes:
- ✓ All source code files
- ✓ Configuration files
- ✓ Git history
- ✓ Public assets
- ✓ Documentation

### What's Excluded from the Backup

To keep the backup size small, these items are excluded:
- ✗ `node_modules/` - Dependencies (can be reinstalled)
- ✗ `.next/` - Build output
- ✗ `out/` - Export output
- ✗ `dist/` - Distribution files
- ✗ `build/` - Build artifacts
- ✗ `.cache/` - Cache files
- ✗ `*.log` - Log files

### Restoring from a Local Backup

1. **Extract the backup:**
   ```bash
   tar -xzf jayank-portfolio_backup_YYYYMMDD_HHMMSS.tar.gz
   ```

2. **Navigate to the directory:**
   ```bash
   cd jayank-portfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Verify the restoration:**
   ```bash
   npm run dev
   ```

## Method 2: GitHub Actions Automated Backup

### Triggering a Manual Backup

1. Go to the repository on GitHub
2. Click on the "Actions" tab
3. Select "Create Repository Backup" workflow
4. Click "Run workflow"
5. Select the branch and click "Run workflow"

### Downloading GitHub Actions Backups

1. Navigate to the workflow run
2. Scroll to the "Artifacts" section
3. Download the backup archive
4. Follow the restoration steps above

### Enabling Scheduled Backups

To enable automatic weekly backups:

1. Edit `.github/workflows/backup.yml`
2. Uncomment the schedule cron line:
   ```yaml
   schedule:
     - cron: '0 0 * * 0'  # Every Sunday at midnight UTC
   ```
3. Commit and push the change

### Backup Retention

- Artifacts are retained for 90 days by default
- Older backups are automatically deleted
- Adjust `retention-days` in the workflow file if needed

## Best Practices

### Regular Backups

- Create backups before major changes
- Keep backups in multiple locations
- Test restoration periodically

### Backup Frequency Recommendations

- **Active Development:** Daily or before significant changes
- **Stable Projects:** Weekly or monthly
- **Production Sites:** Before each deployment

### Storage Recommendations

- Keep at least 3 recent backups
- Store backups in a different location than the repository
- Consider cloud storage for important backups (Google Drive, Dropbox, etc.)

### Security Considerations

- Backups include the `.git` directory with full history
- Do not commit backups to the repository (already in `.gitignore`)
- Keep backups secure if they contain sensitive data
- Ensure backup locations have appropriate access controls

## Troubleshooting

### Backup Script Fails

**Issue:** Permission denied

**Solution:**
```bash
chmod +x backup.sh
```

**Issue:** Not a git repository error

**Solution:** Ensure you're running the script from the repository root directory

### Restoration Issues

**Issue:** Missing dependencies

**Solution:**
```bash
npm install
# or if using a specific package manager
yarn install
# or
pnpm install
```

**Issue:** Build errors after restoration

**Solution:**
```bash
# Clean install
rm -rf node_modules
npm install
npm run build
```

## Additional Information

### Backup Size

Typical backup sizes:
- Without dependencies: ~300-500 KB
- With dependencies: Would be much larger (not recommended)

### Compression

The script uses gzip compression (`.tar.gz` format):
- Good compression ratio
- Wide compatibility
- Easy to extract on all platforms

### Cross-Platform Notes

#### Windows

Use Git Bash or WSL to run the backup script:
```bash
# In Git Bash or WSL
./backup.sh
```

Or use PowerShell to create a backup manually:
```powershell
tar -czf backup.tar.gz --exclude=node_modules --exclude=.next .
```

#### macOS/Linux

The script works natively on Unix-like systems.

## Alternative Backup Methods

### Manual Git Clone

```bash
git clone --mirror https://github.com/Jayank-Tiwari/jayank-portfolio.git
```

### Using Git Bundle

```bash
git bundle create jayank-portfolio.bundle --all
```

To restore:
```bash
git clone jayank-portfolio.bundle jayank-portfolio
```

### Cloud Sync

Consider syncing the repository folder with cloud storage:
- Google Drive
- Dropbox
- OneDrive
- iCloud Drive

## Support

For issues or questions about backups:
1. Check this documentation
2. Review the backup script comments
3. Create an issue in the repository
