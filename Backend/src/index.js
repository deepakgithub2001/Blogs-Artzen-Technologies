import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";
dotenv.config({ path: "./env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(
        `Server is running at port: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log("MONGODB connection failed", err));
