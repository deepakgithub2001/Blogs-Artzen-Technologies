import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/register", {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            });

            console.log("User Created:", response.data);
            setMessage("User created successfully!");
            navigate("/login")
            setUserData({ name: "", email: "", password: "", confirmPassword: "" });
        } catch (error) {
            console.error("Error creating user:", error);
            setMessage("Failed to create user. Try again.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center md:min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-5">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h2>
                    {message && <p className="text-center text-red-500 font-semibold">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;