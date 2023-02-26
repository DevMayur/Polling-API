import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import routes from "./routes/routes.js";

const app = express();
const PORT = 3050;
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.listen(PORT, (req, res) => {
    console.log("server listening on port", PORT);
});
