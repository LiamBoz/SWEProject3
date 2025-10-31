import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginInput.css";


export function LoginInput() {
  const [ usernameInput, setUsernameInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ showUsername, setShowUsername] = useState(false);
  const [ loginActivated, setLoginActivated ] = useState(false);

  //const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const navigate = useNavigate();


  function saveUsernameText(event){
    //saving username text
    setUsernameInput(event.target.value);
  }

  function savePasswordText(event){
    //saving password text
    setPasswordInput(event.target.value);
  }

  function handleLogin(){
   // setIsAuthenticated(true);
    navigate('/homepage');
  }

  function login(){
    //saving login input to state variables username and password
    setUsername(usernameInput);
    setPassword(passwordInput);

    //username can only contain letters upper or lowercase
    const validUsernameChars =  /^[A-Za-z]+$/;
    let validUsername = false;
    /*
      Password must meet following requirements:
        Must be 8 characters long
        Must include at least one of each:
          Uppercase letter
          Lowercase letter
          Number
          Special symbol
    */
    const validPasswordRule = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+={}[\]:;"'<>,.?/\\|~`]).{8,}$/;

    {validUsernameChars.test(usernameInput) && validPasswordRule.test(passwordInput) ? setShowUsername(true) : setShowUsername(false)}
    {validUsernameChars.test(usernameInput) && validPasswordRule.test(passwordInput) ? validUsername = true : validUsername = false}
    
    //If login is clicked, error messages can be shown
    setLoginActivated(true);

    if (validUsername && usernameInput && passwordInput){
      handleLogin();
    }

    //clears input from search bars
    setPasswordInput('');
    setUsernameInput('');
  }

  return(
    <div className="welcome">
       {/*Welcome Paragraph*/}
        <p className="welcome-message">
          Welcome to Chopify
        </p>
      {/*<form onSubmit={handleInput}> */}
        <div className="login-bar">
           {/*Username bar*/}
           <input
          type = "text"
          placeholder="Username"
          onChange={saveUsernameText}
          value={usernameInput}
          className="username-input"
          />
          </div>

        <div className="login-bar">
           {/*Password bar*/}
            <input 
              type="password"
              placeholder="Password"
              onChange={savePasswordText}
              value={passwordInput}
              className="password-input"
          />
          </div>
        {/*Login button*/}
        <button 
        type="submit"
        onClick={login}
        className="login-btn">
            Login
          </button>
          {/* </form> */}

         {/*Conditional paragraphs displayed*/}
          {!showUsername &&
            <p>
            Username may only contain letters with no spaces, numbers, or special symbols.
          </p>}

          {!showUsername &&
          <p>
            Password must be 8 characters long, must include at least one uppercase letter, at least one lowercase letter, at least one number, and at least one special symbol.
          </p>}

          {/* {showUsername && username && password &&
          <p>
            My username is {username}
          </p>
          } */}

          {/* {showUsername && username && password &&
          <p>
            My password is {password}  
          </p>} */}

          {(!showUsername) && username && password &&
            <p>
            Error! Your username or password does not meet the requirements. Please try again!
            </p>}
            {(!username) && loginActivated &&
            <p>
              Error! Please enter your username.
            </p>
            }

            {(!password) && loginActivated &&
            <p>
              Error! Please enter your password.
            </p>
            }
    </div>  
  );
}
