# Welcome To AWS S3 Clone 

## Getting Started

### Step 1: Install Node.js

Make sure you have Node.js version 18.18.0 installed. If not, you can download it [here](https://nodejs.org/).

### Step 2: Install MySQL Server

Ensure you have MySQL version 8.1 installed. You can download it [here](https://dev.mysql.com/downloads/).

### Step 3: Set Up the Database

1. Create a new database in your MySQL server.
2. Import the initial data using the provided file (`dependencies/s3.sql`).
   - You can use tools like MySQL Workbench or phpMyAdmin for this step.

### Step 4: Create .env File

1. Create a new file named `.env` in the root directory of your project.
2. Reference the structure from the template file located at `dependencies/env.js`.

### Step 5: Install Dependencies

Open your terminal, navigate to the project's root directory, and run the following commands:

```bash
npm install
```
```bash
npm start
```

These commands will install all necessary dependencies and start the server.

Now you're all set! Open your browser and navigate to `http://localhost:your-chosen-port` to see the authentication system in action.

Feel free to explore the code and customize it according to your needs
Happy coding!
