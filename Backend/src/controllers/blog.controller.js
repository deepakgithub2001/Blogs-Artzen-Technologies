import Blogs from "../models/blogs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createBlogs = asyncHandler(async (req, res) => {
  const { title, content, authorName } = req.body;
console.log(title +" "+ content + " "+ authorName)
  if (!title || !content || !authorName) {
    throw new ApiError(400, "All fields are required");
  }
console.log(req.file);

  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  const avatarURL = avatarLocalPath
    ? await uploadOnCloudinary(avatarLocalPath)
    : null;

  const newBlog = await Blogs.create({
    title,
    content,
    avatar: avatarURL?.url || "",
    authorName,
  });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: newBlog,
  });
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogsList = await Blogs.find({});
  
    if (!blogsList) {
      throw new ApiError(401, "Blogs List Not found");
    }
  
    res
      .status(200)
      .json(new ApiResponse(200, blogsList, "Get Blogs List Successfully"));
  });
  

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(401, "id is not vailed");
  }

  const blog = await Blogs.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  await Blogs.findByIdAndDelete(id);

  res.status(201).json(new ApiResponse(201, "", "Blog deleted successfully"));
});

const updateBlogs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, authorName } = req.body;

  const blog = await Blogs.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const avatarURL = avatarLocalPath
    ? await uploadOnCloudinary(avatarLocalPath)
    : null;

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.authorName = authorName || blog.authorName;
  if (avatarURL?.url) {
    blog.avatar = avatarURL.url;
  }

  const updatedBlog = await blog.save();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});

const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog ID");
  }

  
  const blog = await Blogs.findById(id);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

 
  res.status(200).json(
    new ApiResponse(200, blog, "Fetched single blog successfully")
  );
});


export { createBlogs, getAllBlogs, deleteBlog, updateBlogs, getSingleBlog };
