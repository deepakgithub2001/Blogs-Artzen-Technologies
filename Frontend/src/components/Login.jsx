import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/login", {
        email,
        password,
      });
  
      const { token } = response.data.data;
  
      localStorage.setItem("token", token); // Correct usage
  
      setError("");
      alert("Login Successfully");
  
      navigate("/"); // Redirect after successful login
  
    } catch (err) {
      console.log("Login Error:", err);
      const message = err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center md:min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email.."
                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password.."
                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <a href="/sign_up" className="text-blue-600 hover:underline ml-1">Sign Up</a>
            </p>
            <p className="text-sm mt-1">
              <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
