import React, { useEffect, useState } from 'react'
import "./RowPost.css"
import axios from '../../axios'

import {imageUrl } from '../../constants/constants'

const RowPost = (props) => {
  const[movies,setMovies]=useState([])

  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      setMovies(response.data.results)

    })
  })
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
      {movies.map((obj)=>
        <img  className={props.isSmall?'smallPoster':"poster"} alt="poster" src={`${imageUrl+obj.backdrop_path}`}/>
      )}
      </div>
    </div>
  )
}

export default RowPost
