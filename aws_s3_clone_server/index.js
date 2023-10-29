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
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));  // For parsing form data
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/download', express.static(join(__dirname, 'uploads'))); // For preview files from upload folder directly
// Always use routes in last
// Here in routes we have all our routing configurations
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Your backend is running on :", process.env.PORT);
});
