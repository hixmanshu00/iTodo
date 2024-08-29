# iTodo App

iTodo is a task management app built using React Native and Expo for the frontend, with a Node.js and Express backend connected to a MongoDB database. This app allows users to create, manage, and organize their tasks with categories, due dates, and priorities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Backend API Endpoints](#backend-api-endpoints)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Contributors](#contributors)

## Introduction

The iTodo app is designed to help users manage their daily tasks efficiently. Users can add tasks, categorize them, set due dates, mark them as completed, and delete them when necessary. The app also allows sorting tasks by due date, creation date, or priority.

## Features

- **Task Management:** Add, update, delete, and view tasks.
- **Categorization:** Categorize tasks into various categories like "Work," "Personal," etc.
- **Priority Management:** Mark tasks as high priority.
- **Date Management:** Set due dates and sort tasks based on due dates, creation dates, or priority.
- **User Authentication:** User registration and login functionality.
- **Offline Storage:** Store user data locally using AsyncStorage.
- **Gestures:** Swipe to delete tasks or mark as completed.

## Architecture

- **Frontend:** Built with React Native and Expo. Utilizes components for task management, modals for adding tasks, and AsyncStorage for local data storage.
- **Backend:** Built with Node.js, Express, and MongoDB. The backend handles user authentication and task management, connecting to the MongoDB database hosted on Atlas.

## Installation

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Expo CLI** installed globally.
- **MongoDB** database (preferably MongoDB Atlas).

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/hixmanshu00/itodo.git
    cd itodo-app/backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the backend directory and add your MongoDB connection string:

    ```env
    MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/iTodo?retryWrites=true&w=majority
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the Expo development server:

    ```bash
    npm start
    ```

4. Use the Expo Go app on your mobile device or an emulator to run the app.

## Usage

1. **User Authentication:**
   - Register and login as a user.
   - Upon successful login, your tasks will be fetched from the server.

2. **Task Management:**
   - Add new tasks by pressing the `+` button.
   - Assign a category and due date.
   - View tasks by category.
   - Mark tasks as completed or delete them.
   - Sort tasks by due date, creation date, or priority.

## Backend API Endpoints

- **User Routes:**
  - `POST /users/register` - Register a new user.
  - `POST /users/login` - Login a user.

- **Todo Routes:**
  - `GET /todos/:userId` - Get all todos for the logged-in user.
  - `GET /todos/completed/:date` - Get all completed todos for a specific date.
  - `POST /todos/:userId` - Create a new todo.
  - `PUT /todos/:todoId` - Update an existing todo.
  - `DELETE /todos/:todoId` - Delete a todo by ID.
  - `PATCH /todos/:todoId/toggleStatus` - Toggle pending/complete status of a todo.
  - `PATCH /todos/:todoId/togglePriority` - Toggle priority of a todo.

## Configuration

- **MongoDB:** The app uses MongoDB Atlas for database storage. Ensure the connection string in the backend `.env` file is correctly set.
- **Expo:** Ensure that the Expo CLI is set up properly, and the environment is configured for React Native development.

## Dependencies

### Backend

- **Express:** Web framework for Node.js.
- **Mongoose:** MongoDB object modeling for Node.js.
- **Body-parser:** Middleware for parsing request bodies.
- **Cors:** Middleware for enabling CORS.
  
### Frontend

- **React Native:** Framework for building native apps using React.
- **Expo:** A framework and a platform for universal React applications.
- **React Navigation:** Routing and navigation for the React Native app.
- **AsyncStorage:** Unencrypted, asynchronous, persistent, key-value storage system.
- **Moment.js:** Parse, validate, manipulate, and display dates and times in JavaScript.

## Contributors

- **Himanshu Rajput** - [@hixmanshu00](https://github.com/hixmanshu00)