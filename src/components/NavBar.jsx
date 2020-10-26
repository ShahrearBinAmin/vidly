import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="" className="navbar-brand">
        Vidly
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="movies">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">
            Rental
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
