import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    authorName: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("authorName", postData.authorName);
    if (imageFile) {
      formData.append("avatar", imageFile); // name must match Multer field name
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Post Created:", response.data);
      setMessage("Post created successfully!");
      setPostData({ title: "", content: "", authorName: "" });
      setImageFile(null);
      navigate("/stories");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center md:min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Post</h2>
          {message && <p className="text-center text-green-500 font-semibold">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={postData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              name="content"
              placeholder="Enter content"
              value={postData.content}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 border border-gray-300 p-1 rounded"
            />
            <input
              type="text"
              name="authorName"
              placeholder="Enter author name"
              value={postData.authorName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Write;
