# Personalized News Aggregator

## Overview
The Personalized News Aggregator is a web application that allows users to read news articles, bookmark their favorite articles, and customize their news preferences. It consists of a frontend built with React and a backend powered by Node.js and Express, with MySQL as the database.

## Features
- **User Authentication**: Users can sign up and log in to access personalized features.
- **News Articles**: Fetch and display news articles from various categories using the News API.
- **Bookmarking**: Users can bookmark articles for easy access later.
- **User Preferences**: Customize news preferences based on categories and sources.
- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices.

## Tech Stack
- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MySQL
- **State Management**: Context API
- **API Integration**: Axios for REST API calls, News API for fetching news articles

## Project Structure
```
personalized-news-aggregator
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   ├── src
│   └── package.json
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js
- MySQL
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/aayush1693/Personalized-News-Aggregator
   cd Personalized-News-Aggregator
   ```

2. Set up the backend:
   - Navigate to the `backend` directory.
   - Create a `.env` file and add your environment variables.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Run the server:
     ```sh
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Run the application:
     ```sh
     npm start
     ```

4. Set up the project from root:
   - Navigate to the `Personalized-News-Aggregator` directory.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Run the application:
     ```sh
     npm run dev
     ```

## API Endpoints
- **Authentication**
  - `POST /auth/signup`: Register a new user.
  - `POST /auth/login`: Authenticate and receive a JWT.
  - `GET /auth/user`: Get authenticated user details.
  - `POST /auth/reset-password`: Send a password reset link to the user's email.

- **News**
  - `GET /news`: Fetch news articles based on category.

- **Bookmarks**
  - `POST /bookmarks`: Save a user's bookmarked article.
  - `GET /bookmarks`: Fetch all bookmarks for the authenticated user.
  - `DELETE /bookmarks/:id`: Delete a specific bookmark.

- **Preferences**
  - `GET /preferences`: Retrieve user preferences.
  - `PUT /preferences`: Update user preferences.

## Environment Variables
Create a `.env` file in the `backend` directory and add the following environment variables:
```
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=your_mysql_database
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
```

## License
This project is licensed under the MIT License.
