import bodyParser from "body-parser";
import express from "express";

import cors from "cors";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import connectDB from "./database";
import leadsRouter from "./routes/leads.routes";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

connectDB();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

app.use(bodyParser.json());

const options = [
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
];

app.use(options);

// Routes
app.use("/api/leads", leadsRouter);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
