import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Write from './components/Write'
import About from './components/About'
import Stories from './components/Stories'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { useEffect, useState } from 'react'
import axios from "axios"
import ViewPost from './components/viewPost'

function App() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await axios
        .get("http://localhost:4000/users");
      setUsers(response.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={users} />} />
        <Route path="/write" element={<Write />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<ViewPost />} />
      </Routes>
    </>
  );
}
export default App;