import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Blogs", blogsSchema);
