# GymMate 💪

GymMate is a responsive web application built with Vite, React, Tailwind CSS, and Redux, allowing users to track their daily protein intake. The app integrates with Google Calendar, enabling users to log and view their food intake directly within their calendar. The app also supports Docker for containerization, making it easy to deploy and run anywhere.

## Table of Contents

- [GymMate 💪](#gymmate-)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Local Development Setup](#local-development-setup)
    - [Docker Setup](#docker-setup)
  - [Contributing](#contributing)

## Features

- **Track daily protein intake**: Add food items, calories, and quantity to track your daily intake.
- **Google Calendar integration**: Log your intake events directly to Google Calendar.
- **Responsive design**: Fully responsive across different devices.
- **Google Sign-In**: Authenticate using Google OAuth.
- **Redux for State Management**: Uses Redux for handling the global state, including user authentication and food intake data.
- **Persistent Storage**: Food data is saved persistently using Redux-Persist.

## Technologies Used

- **Frontend**: Vite, React, Tailwind CSS
- **State Management**: Redux, Redux-Persist
- **Authentication**: Google OAuth
- **API**: Google Calendar API
- **Containerization**: Docker

## Setup Instructions

Follow these instructions to run the project locally or within a Docker container.

### Prerequisites

- Node.js v16+
- Docker installed
- A Google Cloud Project with Calendar API and OAuth 2.0 configured

### Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/gymmate.git
   cd gymmate
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up environment variables**: Create a .env file in the root directory and add your Google API credentials:
   ```bash
   VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
4. **Start the development server**:
   ```bash
   npm run dev
5. **View the application**: The app will be available at http://localhost:5173.

### Docker Setup
To run the app in a Docker container, follow these steps:

1. **Build the Docker image**:
    ```bash
    docker build -t gymmate-app .
2. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 gymmate-app
3. **Access the app**: Open your browser and navigate to http://localhost:3000.

## Contributing
Feel free to fork the repository and create a pull request with any improvements or features you'd like to add.