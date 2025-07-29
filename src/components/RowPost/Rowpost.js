import React, { useEffect, useState } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import {imageURL} from '../../constants/constants'
import MovieModal from '../MovieModal/MovieModal';

function Rowpost(props) {
    // Favorite movies state
    const [favorites, setFavorites] = useState(() => {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    });

    // Add/remove favorite
    const toggleFavorite = (movieObj) => {
      let updated;
      if (favorites.some(m => m.id === movieObj.id)) {
        updated = favorites.filter(m => m.id !== movieObj.id);
      } else {
        updated = [...favorites, movieObj];
      }
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    };
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

    // Ref for posters div
    const postersRef = React.useRef(null);

    // Scroll by card width
    const scrollByCards = (direction = 1) => {
      const container = postersRef.current;
      if (!container) return;
      // Find a card to get width
      const card = container.querySelector('.movie-card');
      const cardWidth = card ? card.offsetWidth : 120;
      container.scrollBy({ left: direction * (cardWidth * 3), behavior: 'smooth' });
    };

    // ...existing code...

    return (
      <div className='Row' style={{ position: 'relative' }}>
        <h2>{props.title}</h2>
        <button
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#222', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Scroll left"
          onClick={() => scrollByCards(-1)}
        >&lt;</button>
        <button
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#222', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Scroll right"
          onClick={() => scrollByCards(1)}
        >&gt;</button>
        <div
          className="posters enhanced-scroll"
          ref={postersRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '6px',
            paddingBottom: '10px',
            paddingTop: '8px',
            scrollBehavior: 'smooth',
            width: '100%',
            minHeight: props.isSmall ? '110px' : '160px',
          }}
        >
          {movie.map((obj) => {
            const isSelected = hoveredMovieId === obj.id || selectedMovie?.id === obj.id;
            const isFavorite = favorites.some(m => m.id === obj.id);
            return (
              <div
                key={obj.id}
                className={`movie-card ${props.isSmall ? 'smallPoster' : 'poster'}${isSelected ? ' selected' : ''}`}
                style={{
                  minWidth: props.isSmall ? '120px' : '180px',
                  maxWidth: props.isSmall ? '120px' : '180px',
                  background: isSelected ? '#222' : '#181818',
                  border: isSelected ? '2px solid #e50914' : '2px solid transparent',
                  borderRadius: '10px',
                  boxShadow: isSelected ? '0 6px 24px rgba(229,9,20,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'transform 0.18s cubic-bezier(.25,.8,.25,1), box-shadow 0.18s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '8px 4px',
                  position: 'relative',
                  transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                  zIndex: isSelected ? 2 : 1,
                }}
                onMouseEnter={() => handleMouseEnter(obj.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={imageURL + (obj.backdrop_path || obj.poster_path)}
                  alt={obj.title || obj.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: props.isSmall ? '120px' : '180px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    boxShadow: isSelected ? '0 2px 12px #e50914' : 'none',
                    transition: 'box-shadow 0.18s',
                    background: '#222',
                    filter: 'blur(8px)',
                  }}
                  onLoad={e => { e.target.style.filter = 'none'; }}
                  onClick={() => handlePosterClick(obj)}
                />
                <div style={{
                  color: '#fff',
                  fontSize: props.isSmall ? '0.8rem' : '1rem',
                  textAlign: 'center',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  textShadow: '0 1px 4px #000',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}>{obj.title || obj.name}</div>
                <button
                  style={{
                    position: 'absolute', top: 8, right: 8, background: isFavorite ? '#e50914' : '#222', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 18, boxShadow: '0 2px 8px #000',
                  }}
                  title={isFavorite ? 'Unmark Favorite' : 'Mark as Favorite'}
                  onClick={e => { e.stopPropagation(); toggleFavorite(obj); }}
                >{isFavorite ? '★' : '☆'}</button>
              </div>
            );
          })}
        </div>
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      </div>
    );
}

export default Rowpost
