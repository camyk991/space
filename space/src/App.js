import "./App.css";
import Galaxy from "./components/galaxy";
import React, {useState, useEffect} from 'react'
import PlanetList from './components/planetList'

function App() {

  const [planets, setPlanets] = useState();

  const fetchData = async() => {
    try {
      const res = await fetch('https://api.le-systeme-solaire.net/rest/bodies/');
      const bodies = await res.json();
      const planets = await bodies.bodies.filter(el => el.isPlanet);
      setPlanets(planets);

      return planets
    } catch(err) {
      console.log(err)
    }
  }    

  useEffect(() => {
    return fetchData();
  }, [])

  useEffect(() => {
    console.log(planets);
  }, [planets])

  return (
    <div className="App">
      <Galaxy />
      <PlanetList planets={planets}/>
    </div>
  );
}

export default App;
