/*
 
  @ Pushpendra
  Desc - Started Project
  Date - 28/10/23
 
 */

import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.mjs";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Always use routes in last
// Here in routes we have all our routing configurations
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Your backend is running on :", process.env.PORT);
});
