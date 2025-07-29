import React, { useEffect, useState } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import {imageURL} from '../../constants/constants'
import MovieModal from '../MovieModal/MovieModal';

function Rowpost(props) {
    const [movie, setMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
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
    };

    const closeModal = () => {
      setSelectedMovie(null);
    };

    const handleMouseEnter = (movieId) => {
      setHoveredMovieId(movieId);
    };

    const handleMouseLeave = () => {
      setHoveredMovieId(null);
    };

    return (
      <div className='Row'>
        <h2>{props.title}</h2>
        <div className="posters" style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '10px' }}>
          {movie.map((obj) => (
            <div
              key={obj.id}
              className={`movie-card ${props.isSmall ? 'smallPoster' : 'poster'}${hoveredMovieId === obj.id ? ' selected' : ''}`}
              style={{
                minWidth: props.isSmall ? '120px' : '180px',
                maxWidth: props.isSmall ? '120px' : '180px',
                background: hoveredMovieId === obj.id ? '#222' : '#181818',
                border: hoveredMovieId === obj.id ? '2px solid #e50914' : '2px solid transparent',
                borderRadius: '10px',
                boxShadow: hoveredMovieId === obj.id ? '0 4px 16px rgba(229,9,20,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '8px 4px',
                position: 'relative',
              }}
              onMouseEnter={() => handleMouseEnter(obj.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handlePosterClick(obj)}
            >
              <img
                src={imageURL + (obj.backdrop_path || obj.poster_path)}
                alt={obj.title || obj.name}
                style={{
                  width: '100%',
                  height: props.isSmall ? '120px' : '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              />
              <div style={{
                color: '#fff',
                fontSize: props.isSmall ? '0.8rem' : '1rem',
                textAlign: 'center',
                fontWeight: hoveredMovieId === obj.id ? 'bold' : 'normal',
                textShadow: '0 1px 4px #000',
                marginBottom: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
              }}>{obj.title || obj.name}</div>
            </div>
          ))}
        </div>
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      </div>
    );
}

export default Rowpost
