import React, { useEffect, useState } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import {imageURL} from '../../constants/constants'
import MovieModal from '../MovieModal/MovieModal';

function Rowpost(props) {
    const [movie, setMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    // const [urlID, seturlID] = useState('');

    useEffect(() => {
      axios.get(props.url).then((response)=>{
        setMovie(response.data.results);
      }).catch(err=>{
        alert("Network API Error")
      })
    }, [props.url])

    // const opts = {
    //   height: '390',
    //   width: '100%',
    //   playerVars: {
    //     autoplay: 0,
    //   },
    // };

    const handlePosterClick = (movieObj) => {
      setSelectedMovie(movieObj);
      // Optionally, fetch trailer here and add to modal
    };

    const closeModal = () => {
      setSelectedMovie(null);
    };

    return (
      <div className='Row'>
        <h2>{props.title}</h2>
        <div className="posters"> 
          {movie.map((obj) => (
            <input
              key={obj.id}
              onClick={() => handlePosterClick(obj)}
              className={props.isSmall ? 'smallPoster' : 'poster'}
              alt="Poster"
              type="image"
              src={`${imageURL + obj.backdrop_path}`}
            />
          ))}
        </div>
        {/* Optionally keep YouTube trailer below, or move to modal */}
        {/* { urlID && <YouTube opts={opts} videoId={urlID.key} /> } */}
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      </div>
    );
}

export default Rowpost
