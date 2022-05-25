import React from 'react';
import { Link } from 'react-router-dom';
import "./Bottom.css";
import {useNavigate} from 'react-router-dom';

export default function Bottom() {

  const navigate = useNavigate();

  return (
    <footer className="bottom-footer">
      <div>
        <Link className="footer-title" to="/crypto">
          CryptoNews
        </Link>
      </div>

      <div>
        <div className="link-containers">
          <span className="span-heading">Links </span>
          <Link style={{ marginTop: 30, marginBottom: 10 }} to="/crypto">
            Exchange
          </Link>
          <Link to="/news">News</Link>
        </div>
      </div>

      <div className="link-containers">
        <span className="span-heading">Hot Coins</span>
        <Link to="/coin/bitcoin" style={{ marginTop: 30, marginBottom: 10 }}  >
          Bitcoin
        </Link>
        <Link to="/coin/ethereum" style={{ marginBottom: 10 }}>
          Ethereum
        </Link>
        <Link to="/coin/dogecoin" style={{ marginBottom: 10 }}>
          Dogecoin
        </Link>
      </div>

      <div className="link-containers">
        <span className="span-heading">Other Links</span>
        <a
          href="https://meme-matic.netlify.app/"
          target="_blank"
          style={{ marginTop: 30 }}
        >
          MemeMatic
        </a>
      </div>
    </footer>
  );
}
