//import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import {API_KEY, imageURL} from '../../constants/constants'
// import YouTube from 'react-youtube';


function Banner() {
  const [movie, setMovie] = useState();
  // const [trailerKey, setTrailerKey] = useState(null);
  // const [showPlayer, setShowPlayer] = useState(false);
  const [myList, setMyList] = useState(() => {
    const stored = localStorage.getItem('myList');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      const movie_num = Math.floor(Math.random() * response.data.results.length);
      setMovie(response.data.results[movie_num]);
    })
  }, []);

  const handlePlay = () => {
    if (!movie) return;
    const type = movie.title ? 'movie' : 'tv';
    axios.get(`${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(res => {
        const trailers = res.data.results.filter(
          vid => vid.site === 'YouTube' && vid.type === 'Trailer'
        );
        if (trailers.length > 0) {
          const url = `https://www.youtube.com/watch?v=${trailers[0].key}`;
          window.open(url, '_blank');
        } else {
          alert('No trailer found!');
        }
      });
  };

  const isInMyList = movie && myList.some(m => m.id === movie.id);

  const handleMyList = () => {
    if (!movie) return;
    let updatedList;
    if (isInMyList) {
      updatedList = myList.filter(m => m.id !== movie.id);
    } else {
      updatedList = [...myList, movie];
    }
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  return (
    <div className='banner' style={{ backgroundImage: `url(${movie ? imageURL + movie.backdrop_path : ""})` }}>
      <div className='content'>
        <h1 className='title'>{movie ? (movie.title || movie.name) : ""}</h1>
        <div className='banner_buttons'>
          <button className='button' onClick={handlePlay}>Play</button>
          <button className='button' onClick={handleMyList} style={isInMyList ? {background: '#e50914', color: '#fff'} : {}}>
            {isInMyList ? 'Remove from My List' : 'My List'}
          </button>
        </div>
        <h1 className='Description'>{movie ? movie.overview : " "}</h1>
        {/* Trailer will open in a new tab, not embedded here */}
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner
