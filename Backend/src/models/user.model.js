import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
     
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
     
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
    
    },
   
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
