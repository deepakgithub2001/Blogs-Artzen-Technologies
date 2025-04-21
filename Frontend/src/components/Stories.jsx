import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Stories() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ Fixed typo

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Fetched posts:", response.data.data);
      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Latest Blog Stories</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {posts.map((post) => (
              <div
                key={post.id || post._id}
                className="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">{post.title}</h2>
                    <div className="text-sm text-gray-500">
                      By <span className="font-medium">{post.authorName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/stories/${post.id || post._id}`)}
                    className="ml-4 p-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Stories;
