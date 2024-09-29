# Personalized News Aggregator

## Overview
The Personalized News Aggregator is a web application that allows users to read news articles, bookmark their favorite articles, and customize their news preferences. It consists of a frontend built with React and a backend powered by Node.js and Express, with MySQL as the database.

## Features
- **User Authentication**: Users can sign up and log in to access personalized features.
- **News Articles**: Fetch and display news articles from various categories.
- **Bookmarking**: Users can bookmark articles for easy access later.
- **User Preferences**: Customize news preferences based on categories and sources.
- **Responsive Design**: The application is designed to work seamlessly on both mobile and desktop devices.

## Tech Stack
- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MySQL
- **State Management**: Context API
- **API Integration**: Axios for REST API calls

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
   ```
   git clone <repository-url>
   cd personalized-news-aggregator
   ```

2. Set up the backend:
   - Navigate to the `backend` directory.
   - Create a `.env` file and add your environment variables.
   - Install dependencies:
     ```
     npm install
     ```
   - Run the server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Run the application:
     ```
     npm start
     ```

## API Endpoints
- **Authentication**
  - `POST /auth/signup`: Register a new user.
  - `POST /auth/login`: Authenticate and receive a JWT.

- **News**
  - `GET /news`: Fetch news articles based on category.

- **Bookmarks**
  - `POST /bookmarks`: Save a user's bookmarked article.
  - `GET /bookmarks`: Fetch all bookmarks for the authenticated user.
  - `DELETE /bookmarks/:id`: Delete a specific bookmark.

- **Preferences**
  - `GET /preferences`: Retrieve user preferences.
  - `PUT /preferences`: Update user preferences.

## License
This project is licensed under the MIT License.