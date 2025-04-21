import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" })); // ✅ increased limit
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // ✅ increased limit
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

export default app;
