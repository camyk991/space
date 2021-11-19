import Galaxy from "./components/galaxy";
import LoginForm from "./components/loginForm";
import Countdown from "./components/countdown";
import Intro from "./components/intro";
import {useState} from 'react';
function App() {
  return (
    <div className="App">
      <Intro />
      <Countdown />
      <Galaxy />
      {/* <LoginForm /> */}
      
    </div>

  );
}

export default App;
