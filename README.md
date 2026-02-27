# Typing Speed Test Web App

A modern, interactive typing speed test application built with React, TypeScript, and Tailwind CSS. Test your typing speed (WPM) and accuracy with real-time feedback.

## Features

- Real-time character-by-character feedback
- WPM (Words Per Minute) calculation
- Accuracy tracking
- Timer display
- Multiple sample texts
- Clean, modern UI
- Fully responsive design
- No database required - completely client-side

## Running Locally

### Prerequisites
- Node.js 20 or higher
- npm

### Installation

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Docker Deployment

### Using Docker

Build and run the container:

```bash
docker build -t typing-speed-test .
docker run -p 3000:80 typing-speed-test
```

Visit `http://localhost:3000`

### Using Docker Compose

```bash
docker-compose up -d
```

Visit `http://localhost:3000`

To stop:

```bash
docker-compose down
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## How to Use

1. Start typing in the text area when ready
2. The timer starts automatically when you begin typing
3. Type the displayed text as accurately as possible
4. Green text indicates correct characters, red indicates mistakes
5. Complete the entire text to see your final results
6. Click "New Test" to try again with a different text

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)
- Docker & Nginx (for deployment)
