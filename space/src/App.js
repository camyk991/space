//import Galaxy from "./components/galaxy";
import Planets from "./components/planets";
import React, { useState, useEffect } from "react";
import PlanetList from "./components/planetList";
import LoginForm from "./components/loginForm";
import Intro from "./components/intro";
import Logo from "./components/logo";
import Countdown from "./components/countdown";

function App() {
  const [planets, setPlanets] = useState();

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.le-systeme-solaire.net/rest/bodies/"
      );
      const bodies = await res.json();
      const planets = await bodies.bodies.filter((el) => el.isPlanet);
      setPlanets(planets);

      return planets;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return fetchData();
  }, []);

  useEffect(() => {
    console.log(planets);
  }, [planets]);

  return (
    <div className="App">
      {/* <Intro />
      <Countdown /> */}
      {/* <Galaxy /> */}
      {planets ? <Planets planets={planets} /> : null}
      <PlanetList planets={planets} />
      {/* <LoginForm /> 
      <Logo /> */}
    </div>
  );
}

export default App;
