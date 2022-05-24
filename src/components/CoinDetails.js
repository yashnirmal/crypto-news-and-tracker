import React from 'react'
import { useState,useEffect} from 'react';
import "./CoinDetails.css";
import {CircularProgress,LinearProgress} from '@material-ui/core';
import { useParams } from 'react-router-dom';



export default function CoinDetails(props) {

    let [coinData,setCoinData] = useState({});
    let [loading,setLoading] = useState(true);

    const fetchCoinDetails = ()=>{
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
            'X-RapidAPI-Key': 'ecb580c7abmsh3c86003d6b33c29p1051f6jsnc95b28b7d36c'
            }
        };

        fetch(`https://coingecko.p.rapidapi.com/coins/${props.coinid}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`, options)
        .then(response => response.json())
        .then(result => {
            setCoinData(result);
            console.log(result);
            setLoading(false);
        })
        .catch(err => console.error(err))
    }


    useEffect(()=>{
        fetchCoinDetails();
    },[]);

    if(!coinData)
    return <LinearProgress />;

    return (
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="coindetails-div">
            <img src={coinData.image.large} alt="crypto logo" />
            <h1 style={{ fontSize: "3rem", marginTop: 20 }}>{coinData.name}</h1>
            <span className="description-span">
              {coinData.description.en.substring(0, 500)}
            </span>
            <div className="coin-data-div">
              <div>
                <h4 style={{ display: "inline-block" }}>Rank : </h4>
                <span> {coinData.market_cap_rank}</span>
              </div>

              <div>
                <h4 style={{ display: "inline-block" }}>Price : </h4>
                <span> $ {coinData.market_data.current_price.usd}</span>
              </div>

              <div>
                <h4 style={{ display: "inline-block" }}>Market Cap : </h4>
                <span> {coinData.market_data.market_cap.usd}</span>
              </div>
            </div>
          </div>
        )}
      </>
    );
}
