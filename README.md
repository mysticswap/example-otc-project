# Project Overview

This project is a backend service built using NestJS, designed to manage Over-The-Counter (OTC) market data for a cryptocurrency application. The service interacts with a MongoDB database to store and manipulate user points, which represent a form of digital currency within the OTC market. The project includes functionalities such as creating an OTC market, updating user points based on trading activities, and managing user profiles.

## Key Features

- **OTC Market Creation**: Showcases how we initialize a new OTC market with predefined parameters including market name, chain ID, and URLs for fetching and displaying token symbols.
- **User Points Management**: Allows for adding new users, updating existing user points based on trading activities, and retrieving user points.
- **Scheduled Updates**: Implements a scheduled task to periodically update all users' points based on our Mystic API OTC points data, ensuring the system reflects the latest trading activities accurately.
- **API Endpoints**: Exposes RESTful API endpoints for interacting with the OTC market data and user points.

## Technical Stack

- **Backend Framework**: NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Database**: MongoDB, used for storing user points and other related data.
- **HTTP Client**: Axios, for making HTTP requests to external APIs.
- **Scheduling**: NestJS Schedule module, for executing tasks at specified intervals.

## Code Structure

### Service Layer (`app.service.ts`)

The service layer contains the business logic of the application. It defines methods for:

- Creating an OTC market Sample.
- Fetching user points.
- Updating all users' points.
- Updating individual user points based on new token data.
- Adding new users with initial points.

### Controller Layer (`app.controller.ts`)

The controller layer handles incoming HTTP requests and delegates them to the appropriate service methods. It exposes:

- A GET endpoint for retrieving user points.
- A scheduled task for daily updates on all users' points.

## Getting Started

To start working with this project, ensure you have Node.js installed on your machine. Then, clone the repository and navigate to the project directory. Install the dependencies by running:

```bash
npm install
```

Before running the application, make sure to set up environment variables for `MYSTIC_API_URL`, `MYSTIC_ADMIN_KEY`, and `MYSTIC_CLIENT_KEY`. These are required for making authenticated requests to the external API.

Start the application by running:

```bash
npm run start
```

The application will now be accessible, and you can interact with its endpoints through tools like Postman or directly via HTTP clients.
