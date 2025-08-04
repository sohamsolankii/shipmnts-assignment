# Project Setup

This project is a server-side application built with Node.js, Express, and MongoDB. Follow the steps below to set up the project locally.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local instance or MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following variables:

   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   ```

4. **Start the server:**

   ```sh
   npm run dev
   ```

   The server should now be running on `http://localhost:3000`.

