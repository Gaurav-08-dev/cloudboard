import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/routes/authRoutes";
import { connectDB } from "./config/db";

connectDB();

const app = express();

const devOrigins = [
  "http://localhost:3000", // shell
  "http://localhost:3001", // auth-mfe
  "http://localhost:3002", // dashboard-mfe
  "http://localhost:3003", // analytics-mfe
  "http://localhost:3004", // admin-mfe
];

app.use(
  cors({
    origin: devOrigins,
    credentials: true,
  }),
);

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
