import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const { logout, token } = props;
  return (
    <div className="navbar">
      <h3>Pet Blog</h3>
      <div>
        <button>
          <Link className="navbar-link" to="/profile">
            Profile
          </Link>
        </button>
        <button>
          <Link className="navbar-link" to="/public">
            Public
          </Link>
        </button>
      <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
}
