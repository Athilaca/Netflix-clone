import React, { useEffect, useState } from 'react'
import "./RowPost.css"
import axios from '../../axios'
import Youtube from 'react-youtube'

import {imageUrl,API_KEY } from '../../constants/constants'

const RowPost = (props) => {
  const[movies,setMovies]=useState([])
  const[urlId,seturlId]=useState('')

  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovies(response.data.results)

    })
  })

  const closeVideo = () => {
    seturlId('');
  };


  const opts = {
      height: '400',
      width: '100%',

      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const handleMovie =(id)=>{
       axios.get(`movie/${id}/videos?api_key=${API_KEY} `).then((response)=>{
        if(response.data.results.length!=0){
          seturlId(response.data.results[0])
        }
       })
    }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>
          <img onClick={()=>{handleMovie(obj.id)}} className={props.isSmall?'smallPoster':"poster"} alt="poster" src={`${imageUrl+obj.backdrop_path}`}/>
        )}
      </div>
      {urlId && (
        <div className='youtube-overlay'>
          <div className='close-icon' onClick={closeVideo}>
            <span>&times;</span>
          </div>
          <Youtube opts={opts} videoId={urlId.key} />
        </div>
      )}
    </div>
  )
}

export default RowPost
