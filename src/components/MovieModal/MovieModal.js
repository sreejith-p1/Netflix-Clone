import React, { useEffect, useState } from 'react';
import './MovieModal.css';

import axios from '../../axios';
import { API_KEY } from '../../constants/constants';
import YouTube from 'react-youtube';

function MovieModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (!movie) return;
    setShowPlayer(false);
    setTrailerKey(null);
    // Try to fetch trailer for both movie and tv
    const type = movie.title ? 'movie' : 'tv';
    axios.get(`${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(res => {
        const trailers = res.data.results.filter(
          vid => vid.site === 'YouTube' && vid.type === 'Trailer'
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      });
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img className="modal-poster" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} alt={movie.title || movie.name} />
        <h2>{movie.title || movie.name}</h2>
        {movie.genre_ids && Array.isArray(movie.genre_ids) && (
          <p><strong>Genres:</strong> {movie.genre_ids.join(', ')}</p>
        )}
        <p><strong>Overview:</strong> {movie.overview}</p>
        {movie.release_date && <p><strong>Release Date:</strong> {movie.release_date}</p>}
        {movie.vote_average && <p><strong>Rating:</strong> {movie.vote_average}</p>}
        {trailerKey && !showPlayer && (
          <button className="button" onClick={() => setShowPlayer(true)} style={{marginTop: '1rem'}}>Play Trailer</button>
        )}
        {showPlayer && trailerKey && (
          <div style={{marginTop: '1rem'}}>
            <YouTube videoId={trailerKey} opts={{ width: '100%', height: '315', playerVars: { autoplay: 1 } }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
