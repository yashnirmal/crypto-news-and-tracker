import React, { useEffect } from "react";
import { useState } from "react";
import Newsitem from "./Newsitem";
import "./Newscontainer.css";
import {CircularProgress} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";


export default function Newscontainer() {
  
  const [newsList,setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [topic,setTopic] = useState('crypto');

  function fetchNews(){
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "ecb580c7abmsh3c86003d6b33c29p1051f6jsnc95b28b7d36c",
      },
    };

    fetch(
      `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${topic}&pageNumber=${page}&pageSize=21&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null`,
      options
    )
      .then((response) => response.json())
      .then((result) => {
        setNewsList(result.value);
        console.log(result.value);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  function handleRadioChange(event){
    console.log(event.target.value);
    setTopic(event.target.value);
  }

  useEffect(()=>{
    fetchNews();
  },[page,topic]);


  return (
    <div className="newscontainer">
      <h1>News</h1>

      <div className="topic-radios">
        <input
          type="radio"
          name="radios"
          id="crypto"
          value="crypto"
          onChange={handleRadioChange}
          
        />
        <label htmlFor="crypto">Crypto</label>

        <input
          type="radio"
          name="radios"
          id="blockchain"
          value="blockchain"
          onChange={handleRadioChange}
        />
        <label htmlFor="blockchain">Blockchain</label>

        <input
          type="radio"
          name="radios"
          id="defi"
          value="defi"
          onChange={handleRadioChange}
        />
        <label htmlFor="defi">Defi</label>

        <input
          type="radio"
          name="radios"
          id="web3"
          value="web3"
          onChange={handleRadioChange}
        />
        <label htmlFor="web3">Web3</label>

        <input
          type="radio"
          name="radios"
          id="bitcoin"
          value="bitcoin"
          onChange={handleRadioChange}
        />
        <label htmlFor="bitcoin">Bitcoin</label>

        <input type="radio" name="radios" id="eth" value="ethereum" onChange={handleRadioChange}/>
        <label htmlFor="eth">Ethereum</label>
      </div>

      <hr style={{ color: "blue", marginBottom: 20 }} />

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="news-container-grid">
          {newsList.map((el) => (
            <Newsitem
              key={el.id}
              title={el.title}
              description={el.description}
              imgurl={el.image.url}
              newsurl={el.url}
              publishDate={el.datePublished}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Pagination
          count={10}
          onChange={(e, value) => {
            setPage(value);
          }}
        />
      </div>
    </div>
  );
}
