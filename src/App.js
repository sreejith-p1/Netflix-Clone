
import React from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import Banner from './components/Banner/Banner'
import Rowpost from './components/RowPost/Rowpost'
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
  return (
    <div>
      <NavBar/>
      <Banner/>
      <Rowpost url={orginals} title="Netflix Originals"/>
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

export default App
