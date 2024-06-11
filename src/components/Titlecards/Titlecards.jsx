import React, { useEffect, useRef, useState } from 'react'
import './Titlecards.css'
import cards_data from '../../assets/cards/Cards_data'
const Titlecards = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOGJhZmE4M2QzMDQzNDQwZWMzNjE1OGY1YjI4MDI3MSIsInN1YiI6IjY2NWZlZDBmZTg4ODlhNzFmYTRiOGYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JAdbVhGTVlZmTSND47e3kLz2pmy0mHAj5LnPAYUjlz0'
    }
  };
  
  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])




  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default Titlecards