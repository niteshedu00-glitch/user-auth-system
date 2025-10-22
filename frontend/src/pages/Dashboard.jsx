import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-red-500 text-lg">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Dashboard</h1>
      <p className="text-lg mb-2">Welcome, {user.name}!</p>
      <p className="text-gray-300">Email: {user.email}</p>
      <p className="text-gray-400 mt-6">You are successfully logged in.</p>
    </div>
  );
};

export default Dashboard;
