

import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import Banner from './components/Banner/Banner';
import Rowpost from './components/RowPost/Rowpost';
import {
  orginals,
  action,
  ComedyMovies,
  HorrorMovies,
  AdventureMovies,
  AnimationMovies,
  CrimeMovies,
  DocumentaryMovies,
  DramaMovies,
  FamilyMovies,
  FantasyMovies,
  MysteryMovies,
  RomanceMovies,
  SciFiMovies,
  ThrillerMovies
} from './urls';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // Remove favorite
  const removeFavorite = (id) => {
    const updated = favorites.filter(m => m.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div>
      <NavBar/>
      <Banner/>
      <Rowpost url={orginals} title="Netflix Originals"/>
      {favorites.length > 0 && (
        <div className='Row' style={{ position: 'relative' }}>
          <h2>My Favorites</h2>
          <button
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#222', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
              document.getElementById('favorites-row').scrollBy({ left: -400, behavior: 'smooth' });
            }}
            aria-label='Scroll left'
          >&lt;</button>
          <button
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#222', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 24, cursor: 'pointer', boxShadow: '0 2px 8px #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
              document.getElementById('favorites-row').scrollBy({ left: 400, behavior: 'smooth' });
            }}
            aria-label='Scroll right'
          >&gt;</button>
          <div id='favorites-row' className="posters" style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '10px', paddingTop: '8px', scrollBehavior: 'smooth' }}>
            {favorites.map(obj => (
              <div
                key={obj.id}
                className='movie-card poster selected'
                style={{
                  minWidth: '180px',
                  maxWidth: '180px',
                  background: '#222',
                  border: '2px solid #e50914',
                  borderRadius: '10px',
                  boxShadow: '0 6px 24px rgba(229,9,20,0.4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '8px 4px',
                  position: 'relative',
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${obj.backdrop_path || obj.poster_path}`}
                  alt={obj.title || obj.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '8px',
                  }}
                />
                <div style={{
                  color: '#fff',
                  fontSize: '1rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textShadow: '0 1px 4px #000',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}>{obj.title || obj.name}</div>
                <button
                  style={{
                    position: 'absolute', top: 8, right: 8, background: '#e50914', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 18, boxShadow: '0 2px 8px #000',
                  }}
                  title='Unmark Favorite'
                  onClick={() => removeFavorite(obj.id)}
                >★</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <Rowpost url={action} title="Action" isSmall />
      <Rowpost url={ComedyMovies} title="Comedy" isSmall />
      <Rowpost url={HorrorMovies} title="Horror" isSmall />
      <Rowpost url={AdventureMovies} title="Adventure" isSmall />
      <Rowpost url={AnimationMovies} title="Animation" isSmall />
      <Rowpost url={CrimeMovies} title="Crime" isSmall />
      <Rowpost url={DocumentaryMovies} title="Documentary" isSmall />
      <Rowpost url={DramaMovies} title="Drama" isSmall />
      <Rowpost url={FamilyMovies} title="Family" isSmall />
      <Rowpost url={FantasyMovies} title="Fantasy" isSmall />
      <Rowpost url={MysteryMovies} title="Mystery" isSmall />
      <Rowpost url={RomanceMovies} title="Romance" isSmall />
      <Rowpost url={SciFiMovies} title="Science Fiction" isSmall />
      <Rowpost url={ThrillerMovies} title="Thriller" isSmall />
    </div>
  );
}

export default App;
