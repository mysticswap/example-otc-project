# Project Overview

This project simulates the codebase of a protocol integrating with Mysticswap, so their points can be traded there. As such, the codebase included both a) the simulated project's codebase and b) the integration code itself. To simulate a partner, we chose to recreate a backend service built using NestJS, designed to manage Over-The-Counter (OTC) market data for a cryptocurrency application. The service interacts with a MongoDB database to store and manipulate user points, which represent a form of digital currency within the OTC market. The project includes functionalities such as simulating creation of an OTC market, updating user points based on trading activities, and managing user profiles, all standard practices in today's web3 ecosystem.

## ContractAddress (test project) (Ask the team for test partner key)

- Blast(1): 0x8d92f6bf90bbc18ff731f0ab8a039e5ec1f0ce62
- Blast(2): 0x7243415B1B5C2e0B4922e1555A225890be58f63e

## Key Integration Features

- **OTC Market Creation**: Showcases how we initialize a new OTC market with predefined parameters including market name, chain ID, and URLs for fetching and displaying token symbols.
- **User Points Management**: Allows for adding new users, updating existing user points based on trading activities, and retrieving user points.
- **Scheduled Updates**: Implements a scheduled task to periodically update all users' points based on our Mystic API OTC points data, ensuring the system reflects the latest trading activities accurately.
- **API Endpoints**: Exposes RESTful API endpoints for interacting with the OTC market data and user points.

## How The Integration Works

The integration code is structured into two main components: the service layer (`app.service.ts`) and the controller layer (`app.controller.ts`). You need to copy and adjust both to your codebase to integrate with Mysticswap.

### Service Layer (`app.service.ts`)

The service layer contains the core business logic of the integration. It defines methods for:

- **Fetching User Points**: Retrieves the points associated with a specific user address.
- **Updating All Users' Points**: Periodically updates the points of all users based on trading activities.
- **Updating Individual User Points**: Adjusts the points of a single user based on new token data received from the Mystic API.
- **Adding New Users and Their Points**: Creates new user profiles with initial points assigned randomly.

Each method in the service layer interacts with the MongoDB database to persist data changes and retrieves data when needed.

Here's how you can view and copy the code:

1. Open the project in Visual Studio Code.
2. Navigate to the `src` folder.
3. Open the `app.service.ts` file.
4. Use the "Go to File..." feature in VSCode to locate the file.
5. Right-click on the file and select "Copy Path".
6. Press `Cmd+C` (or `Ctrl+C` on Windows/Linux) to copy the file path.
7. Paste the copied path into an IDE.

### Controller Layer (`app.controller.ts`)

The controller layer acts as the intermediary between the client and the service layer. It handles incoming HTTP requests and delegates them to the appropriate service methods. The controller includes:

- A GET endpoint (`@Get('/:userAddress')`) for retrieving user points based on a provided user address.
- A scheduled task (`@Cron(CronExpression.EVERY_DAY_AT_1AM)`) that triggers the `updateAllUsers()` method daily to update all users' points.

Similarly, to view and copy the controller layer code:

1. Follow steps similar to those above but target the `app.controller.ts` file instead.

## Technical Stack

- **Backend Framework**: NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Database**: MongoDB, used for storing user points and other related data.
- **HTTP Client**: Axios, for making HTTP requests to external APIs.
- **Scheduling**: NestJS Schedule module, for executing tasks at specified intervals.

## Reproducing the Integration with MysticSwap

This project includes an example of integrating with a third-party app, specifically the Mystic API. To clone this and tweak it in your local machine to fit your application, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install all necessary dependencies.
3. Build the project by running `npm run build`.
4. Start the application by running `npm run start`.

Before proceeding, ensure you have the `MYSTIC_API_URL` and `MYSTIC_CLIENT_KEY` environment variables set up. These are required for authenticating requests to the Mystic API.
