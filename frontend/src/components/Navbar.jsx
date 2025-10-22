import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-semibold text-cyan-400">
          MERN Auth
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-cyan-400 transition">
                Dashboard
              </Link>
              <span className="text-gray-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/register"
                className="hover:text-cyan-400 transition"
              >
                Register
              </Link>
              <Link
                to="/"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-md transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 flex flex-col items-center space-y-3 py-4">
          <Link
            to="/"
            className="hover:text-cyan-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-cyan-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/register"
                className="hover:text-cyan-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                to="/"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-md transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
