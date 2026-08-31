# NASA Image Search

Simple web application for searching NASA's Image and Video Library by keyword and year range.

## Tech Stack

- React + Vite -> frontend
- Node.js + Express -> backend
- NASA Image and Video Library API

## Running Locally

### Prerequisites

- Node.js and npm
- NASA API key

### 1. Clone the repository

```bash
git clone https://github.com/skilesz/NASA-Image-Search
```

### 2. Configure the backend

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
NASA_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your NASA API key.

Start the backend:

```bash
npm start
```

The backend will run on `http://localhost:3001`.

### 3. Configure the frontend

Open a second terminal and navigate to the client directory:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will be available at the URL provided by Vite, typically `http://localhost:5173`.

### 4. Use the application

Enter an optional search term, start date, and/or end year, then click **Search**.

The application retrieves matching images from NASA's Image and Video Library and displays the results with pagination.

### Notes

The NASA API key is stored in the backend environment variables and is never exposed to the frontend. The backend acts as the intermediary between the React application and NASA's API.
