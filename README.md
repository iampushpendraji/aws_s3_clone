# Welcome To AWS S3 Clone

## Getting Started

<!-- For aws_s3_clone_server -->

### Step 1: Install Node.js

Make sure you have Node.js version 18.18.0 installed. If not, you can download it [here](https://nodejs.org/).

### Step 2: Install MySQL Server

Ensure you have MySQL version 8.1 installed. You can download it [here](https://dev.mysql.com/downloads/).

### Step 3: Set Up the Database

1. Create a new database in your MySQL server.
2. Import the initial data using the provided file (`dependencies/s3_clone.sql`).
   - You can use tools like MySQL Workbench or phpMyAdmin for this step.

### Step 4: Change directory to aws_s3_clone_server

```bash
cd aws_s3_clone_server
```

### Step 4: Create .env File

1. Create a new file named `.env` in the root directory of your project.
2. Reference the structure from the template file located at `dependencies/env.js`.

### Step 5: Install Dependencies

```bash
npm install
```

### Step 6: Start Node.js Server

```bash
npm start
```

<!-- For aws_s3_clone_ui -->

### Step 1: Install Node.js

Make sure you have Node.js version 18.18.0 installed. If not, you can download it [here](https://nodejs.org/).

### Step 2: Install Angular

Install angular you can use this command

```bash
npm install -g @angular/cli
```

### Step 3: Change directory to aws_s3_clone_ui

```bash
cd aws_s3_clone_ui
```

### Step 4: Install all the required packages

```bash
npm i
```

### Step 5: You can start the angular server now

```bash
npm start
```

Now you're all set! Open your browser and navigate to `http://localhost:4200` to see the aws_clone system in action.

Feel free to explore the code and customize it according to your needs
Happy coding!
