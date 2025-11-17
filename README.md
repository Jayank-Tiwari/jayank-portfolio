# Jayank Tiwari - Developer Portfolio

A modern, responsive portfolio website built with Next.js, React, and Tailwind CSS.

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## Backup

This repository includes a backup script to create compressed archives of the project.

### Creating a Backup

Run the backup script:

```bash
./backup.sh
```

This will create a `.tar.gz` archive in the `backups` directory (located in the parent directory of this repository by default).

The backup includes all source code, configuration files, and important assets, but excludes:
- `node_modules`
- `.next` build directory
- `out` directory
- Log files
- Cache files

### Custom Backup Location

You can specify a custom backup directory:

```bash
BACKUP_DIR=/path/to/backup/location ./backup.sh
```

### Restoring from Backup

To restore from a backup:

```bash
# Extract the backup archive
tar -xzf jayank-portfolio_backup_YYYYMMDD_HHMMSS.tar.gz

# Navigate to the extracted directory
cd jayank-portfolio

# Install dependencies
npm install

# Run the application
npm run dev
```

## Technologies Used

- **Next.js 16** - React framework for production
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## License

This is a personal portfolio project.

