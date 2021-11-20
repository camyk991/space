import { useRef, useState, useEffect } from "react";
import { signup, login,  logout, useAuth } from "../../firebase";
import "./loginForm.css"
function LoginForm({user}) {
  const[loading, setLoading] = useState(false);
  const currentUser = user;

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    return loading;
  }, [loading])

  async function handleLogin() {
    setLoading(true);
    try{
      await login(emailRef.current.value, passwordRef.current.value);
    }catch(err){
      switch(err.message)
      {
        case "Firebase: Error (auth/wrong-password).":
          alert("Wrong password");
          break;
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
          alert("Access to this account has been temporarily disabled due to many failed login attempts. ");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          alert("Password must be at least 6 characters long");
          break;
        default:
          alert(err.message);
          break;
      }
    }
    
    setLoading(false);
  }

 

  async function handleSignup() {
    setLoading(true);
    try {
     
      
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch(err) {
      switch(err.message)
      {
        case "Firebase: Error (auth/invalid-email).":
          alert("Invalid email");
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          alert("Account with such email already exists");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          alert("Password must be at least 6 characters long");
          break;
        default:
          alert(err.message);
          break;
      }

    }
    setLoading(false);
  }

  return (
    <div className={`loginForm fadein`}>
        <h1>Welcome to Galaxy Simulator</h1>
      <div className="fields">
        <input className="email" ref={emailRef} placeholder="Email" />
        <input className="password" ref={passwordRef} type="password" placeholder="Password" />
      </div>
        
      <button className="signup" disabled={loading || currentUser} onClick={handleSignup}>Sign Up</button>

      <button className="login" disabled={loading || currentUser} onClick={handleLogin}>Log In</button>


    </div>
  );
}

export default LoginForm;
