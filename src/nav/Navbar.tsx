import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-title-container">
        <div className="nav-circle"></div>
        <Link to="/" className="nav-title">No more bully!</Link>
      </div>

      {/* Hamburger toggle button */}
      <div className="nav-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Add conditional class here */}
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" className="nav-link">Home</NavLink>
        </li>
        <li>
          <NavLink to="/game" className="nav-link">Games</NavLink>
        </li>
        <li>
          <NavLink to="/resource" className="nav-link">Resources</NavLink>
        </li>
      </ul>
    </nav>
  );
};
