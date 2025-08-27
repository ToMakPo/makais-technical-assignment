# Technical Assignment

## Goal

Create a simple app that runs on React, Node and Vite. Make a button or two that gets data (from JSON or something else) and presents some of the data on the page. Could populate a table, list, firstname/lastname, etc.

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later is recommended)
- npm (which comes with Node.js)

### Installation & Setup

1.  **Install Frontend Dependencies:**
    In the root directory of the project, run the following command to install the necessary packages for the React application:
    ```bash
    npm install
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `server` directory and run the same command for the backend server:
    ```bash
    cd server
    npm install
    ```

### Running the Application

You will need two separate terminals to run both the frontend and backend servers concurrently.

1.  **Start the Backend Server:**
    In the `server` directory, execute:
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3001`.

2.  **Start the Frontend Development Server:**
    In a new terminal, from the **root** project directory, run:
    ```bash
    npm run dev
    ```
    The Vite development server will start, typically on `http://localhost:5173`.

3.  **View the App:**
    Open your favorite web browser and navigate to `http://localhost:5173`.
