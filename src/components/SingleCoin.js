import React from 'react';
import { useLocation } from 'react-router-dom';
import CoinDetails from './CoinDetails';
import CoinGraph from './CoinGraph';
import "./SingleCoin.css";


export default function SingleCoin() {

    const location = useLocation();
    let coinid = location.state;


  return (
    <div className="siglecoin-div">
      <CoinDetails coinid={coinid} />
      <CoinGraph coinid={coinid} />
    </div>
  );
}
