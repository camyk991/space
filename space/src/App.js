import Galaxy from "./components/galaxy";
import LoginForm from "./components/loginForm";
import Intro from "./components/intro";
import Logo from './components/logo';
import Countdown from "./components/countdown";
import {useState} from 'react';

function App() {
  return (
    <div className="App">
      <Intro />
      <Countdown />
      <Galaxy />
      <LoginForm />
      <Logo />
    
    </div>

  );
}

export default App;
