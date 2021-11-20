import Galaxy from "./components/galaxy";
import LoginForm from "./components/loginForm";
import Intro from "./components/intro";
import Logo from './components/logo';
import Countdown from "./components/countdown";
import {useState, useEffect} from 'react';
import "./App.css";
import { useAuth } from "./firebase";

function App() {

  const currentUser = useAuth();

  const [login, setLogin] = useState(false);
  const [intro, setIntro] = useState(false);

  useEffect(()=> {
    setTimeout(()=>{setLogin(true)}, 3000);  
  }, [])

  

  return (
    <div className="App">
      <Logo />
      {login ? <LoginForm user={currentUser} onLogin={setIntro} setLogin ={setLogin}/> : null}
      {intro ? <Intro /> : null}
      {intro ? <Countdown /> : null}
      <Galaxy />
      
      
    
    </div>

  );
}

export default App;
