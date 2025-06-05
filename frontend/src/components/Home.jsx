import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Home() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/resources/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2>Welcome to MyApp</h2>
      <p>This is the home page. You can navigate to Login or Register from the menu.</p>
      <p>Feel free to explore the application!</p>
    </div>
  );
}