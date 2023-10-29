/*
 
  @ Pushpendra
  Desc - Started Project
  Date - 28/10/23
 
*/

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.mjs";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  // For parsing form data

// Always use routes in last
// Here in routes we have all our routing configurations
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Your backend is running on :", process.env.PORT);
});
