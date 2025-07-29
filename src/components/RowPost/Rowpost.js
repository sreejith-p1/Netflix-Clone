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

    // Check if scrollable (for arrow visibility)
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    React.useEffect(() => {
      const container = postersRef.current;
      if (!container) return;
      const updateScroll = () => {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth - 1);
      };
      updateScroll();
      container.addEventListener('scroll', updateScroll);
      window.addEventListener('resize', updateScroll);
      return () => {
        container.removeEventListener('scroll', updateScroll);
        window.removeEventListener('resize', updateScroll);
      };
    }, [movie]);

    return (
      <div className='Row' style={{ position: 'relative' }}>
        <h2>{props.title}</h2>
        {canScrollLeft && (
          <button
            style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(20,20,20,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 22, boxShadow: '0 2px 8px #000',
            }}
            aria-label="Scroll left"
            onClick={() => scrollByCards(-1)}
          >&#8592;</button>
        )}
        {canScrollRight && (
          <button
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(20,20,20,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 22, boxShadow: '0 2px 8px #000',
            }}
            aria-label="Scroll right"
            onClick={() => scrollByCards(1)}
          >&#8594;</button>
        )}
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
                onClick={() => handlePosterClick(obj)}
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
              </div>
            );
          })}
        </div>
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      </div>
    );
}

export default Rowpost
