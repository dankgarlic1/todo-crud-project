# Todo CRUD Project

This is a Todo CRUD (Create, Read, Update, Delete) application built with Next.js and Prisma, connected to a MongoDB database. This project allows users to manage their tasks efficiently.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create new tasks
- Read and display tasks
- Update existing tasks
- Delete tasks
- User-friendly interface

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building server-side rendered applications
- [Prisma](https://www.prisma.io/) - Database ORM for Node.js and TypeScript
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with static type definitions

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm or yarn
- MongoDB instance (either locally or on a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dankgarlic1/todo-crud-project.git
   cd todo-crud-project
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

1. Create a `.env` file in the prisma directory of your project and configure your MongoDB connection string:

   ```plaintext
   DATABASE_URL="your_mongodb_connection_string"
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

2. Run the following command to generate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. Run the Prisma migration to set up the database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to `http://localhost:3000` to see the application in action.

## Usage

- You can add new tasks by entering the title and description and clicking on the "Add Task" button.
- Existing tasks can be edited or deleted using the respective buttons next to each task.
