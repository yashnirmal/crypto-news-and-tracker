import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <Link className="title" to="/">CryptoNews</Link>

      <div className="links">
        <Link to="/news" className="link-news">
          News
        </Link>
        <Link to="/crypto" className="link-exchange">
          Exchange
        </Link>
      </div>
    </div>
  );
}
