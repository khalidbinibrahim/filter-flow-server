# FilterFlow - Server

This is the backend server for the FilterFlow application, responsible for managing product data, including advanced filtering, sorting, and pagination functionalities. The server is built using Node.js, Express.js, and MongoDB.

## Features

- **Product Management:** Provides an API endpoint to fetch products with support for filtering, sorting, and pagination.
- **Cross-Origin Resource Sharing (CORS):** Configured to allow requests from specific frontend domains.
- **Environment Configuration:** Secure configuration using environment variables.

## Tech Stack

- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB (Native driver)
- **Environment Management:**
  - dotenv for managing environment variables
- **CORS:** 
  - Configured to allow specific origins

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (either locally installed or using a cloud service like MongoDB Atlas)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khalidbinibrahim01/filterflow-server.git
   cd filterflow-server

2. **Clone the .env.example:**
   ```bash
   MONGO_URI=your_full_mongodb_url