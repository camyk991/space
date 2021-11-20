import Galaxy from "./components/galaxy";
import Planets from "./components/planets";
import PlanetList from "./components/planetList";
import LoginForm from "./components/loginForm";
import Intro from "./components/intro";
import Logo from "./components/logo";
import Countdown from "./components/countdown";
import {useState, useEffect} from 'react';
import "./App.css";
import { useAuth } from "./firebase";

function App() {

  const currentUser = useAuth();

  const [login, setLogin] = useState(false);
  const [intro, setIntro] = useState(false);
  const [chosenPlanet, setChosenPlanet] = useState('');

  useEffect(()=> {
    setTimeout(()=>{setLogin(true)}, 3000);  
  }, [])

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

  return (
    <div className="App">
      <Logo />
      {login && currentUser===null ? <LoginForm user={currentUser} onLogin={setIntro} setLogin ={setLogin}/> : ()=><>setIntro(true)</>}
      {intro ? <Intro /> : null}
      {intro ? <Countdown /> : null}
      <Galaxy />
      <Planets chosen={chosenPlanet} />
      <PlanetList planets={planets} chosen={chosenPlanet} setChosen={setChosenPlanet}/>

    </div>
  );
}

export default App;
