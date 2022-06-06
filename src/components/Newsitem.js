import React from 'react';
import './Newsitem.css';

export default function Newsitem(props) {

  return (
    <div className="newsitem">
      <div className="news-image-div">
        <img
          className="news-image"
          src={props.imgurl}
          onClick={() => {
            window.open(props.newsurl);
          }}
        />
      </div>
      <div className="news-content-div">
        <a href={props.newsurl} target="_blank" className="news-title">{props.title.substring(0, 90) + " ..."}</a>
        <p className="news-desc">
          {props.description.substring(0,180) + " ..."}
        </p>
        <p className="news-publishDate">{props.publishDate.substring(0, 10)}</p>
      </div>
    </div>
  );
}
