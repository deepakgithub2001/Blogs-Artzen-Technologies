import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

function ViewPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        title: "",
        content: "",
        author: "",
        image: ""
    });
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchPost = async () => {

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/blogs/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );

                const postData = response.data.data; // ✅ correctly access nested data
                setPost(postData);

                setUpdatedData({
                    title: postData.title,
                    content: postData.content,
                    author: postData.authorName, // adjust if it's `authorName`
                    image: postData.avatar || postData.image || "" // fallback if different naming
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);



    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(
                `http://localhost:8080/api/v1/blogs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            alert("Post deleted successfully!");
            navigate("/stories");
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post. Please try again.");
        }
    };


    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleInputChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedData({ ...updatedData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(
                `http://localhost:8080/api/v1/blogs/${id}`, updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setPost(response.data.data);
            alert("update successfully")
            setEditing(false);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="text-center mt-10 text-gray-600">Loading post...</div>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <NavBar />
                <div className="text-center mt-10 text-red-500">Post not found.</div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
                {!editing ? (
                    <>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                        {updatedData.image && (
                            <img
                                src={updatedData.image}
                                alt="Uploaded"
                                className="h-auto w-auto object-cover rounded mb-4"
                            />
                        )}
                        <p className="text-gray-700 mb-6 whitespace-pre-line text-justify">{post.content}</p>
                        <div className="text-sm text-gray-500 mb-4">
                            Written by <span className="font-medium">{post.authorName}</span> on{" "}
                            {new Date().toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false
                            })}
                        </div>



                        <div className="flex gap-4">
                            <button
                                onClick={handleEditToggle}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={updatedData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <textarea
                            name="content"
                            value={updatedData.content}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-gray-500 border border-gray-300 p-1 rounded"
                        />
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}

export default ViewPost;
