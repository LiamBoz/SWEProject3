import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useCreateUser, useLoginUser } from "../hooks/users.ts";
// @ts-ignore: missing module declaration
import "./LoginInput.css";
import type { UserInput } from "../services/users";

export function LoginInput() {
  const { mutate: createMutate } = useCreateUser();
  const { mutate: loginMutate } = useLoginUser();

  const [ usernameInput, setUsernameInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ showUsername, setShowUsername] = useState(false);
  const [ loginActivated, setLoginActivated ] = useState(false);

  const [ createAccount, setCreateAccount ] = useState(false);
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);

  //const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const navigate = useNavigate();

  function LoggingIn(){
    setIsLoggingIn(true);
  }

  function CreateAccount(){
    setCreateAccount(true);
    setIsLoggingIn(true);
  }


  function saveUsernameText(event){
    //saving username text
    setUsernameInput(event.target.value);
  }

  function savePasswordText(event){
    //saving password text
    setPasswordInput(event.target.value);
  }

  function handleLogin(user: UserInput){
   // setIsAuthenticated(true);
    loginMutate(user, {
      onSuccess: () => navigate('/homepage'),
      onError: (error: any) => {
        console.log(error);
        toast.error("Invalid username or password");
    },
    });
  }

  function handleCreate(user: UserInput){
    createMutate(user, {
      onSuccess: () => handleLogin(user),
      onError: (error) => {
        console.error("Failed to create user:", error);
        toast.error("Could not create account — please choose a new username");
    }
    });
  }

  function login(){
    //saving login input to state variables username and password
    setUsername(usernameInput);
    setPassword(passwordInput);

    // //username can only contain letters upper or lowercase
    // const validUsernameChars =  /^[A-Za-z]+$/;
    // let validUsername = false;
    // /*
    //   Password must meet following requirements:
    //     Must be 8 characters long
    //     Must include at least one of each:
    //       Uppercase letter
    //       Lowercase letter
    //       Number
    //       Special symbol
    // */
    // const validPasswordRule = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+={}[\]:;"'<>,.?/\\|~`]).{8,}$/;

    // {validUsernameChars.test(usernameInput) && validPasswordRule.test(passwordInput) ? setShowUsername(true) : setShowUsername(false)}
    // {validUsernameChars.test(usernameInput) && validPasswordRule.test(passwordInput) ? validUsername = true : validUsername = false}
    
    //If login is clicked, error messages can be shown
    setLoginActivated(true);

    // if (validUsername && usernameInput && passwordInput){
    //   const user: UserInput = {
    //     username: usernameInput,
    //     password: passwordInput
    //   };
    //   handleLogin(user);
    // }

    if (usernameInput && passwordInput){
      const user: UserInput = {
        username: usernameInput,
        password: passwordInput
      };
      handleLogin(user);
    }

    //clears input from search bars
    setPasswordInput('');
    setUsernameInput('');
  }

  function createUserAccount() {
    //saving input to state variables username and password
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
      const user: UserInput = {
        username: usernameInput,
        password: passwordInput
      };
      handleCreate(user);
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
      {(!isLoggingIn) &&
          <div>
            <button className="login-btn" onClick={LoggingIn}>Login</button>
            <button className="login-btn" onClick={CreateAccount}>Create Account</button>
          </div>
        }
         {isLoggingIn &&
        <>
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
        {!createAccount ? 
        <button 
          // type="submit"
          onClick={login}
          className="login-btn">
            Login
        </button> : 
        <button 
          // type="submit"
          onClick={createUserAccount}
          className="login-btn">
            Create Account
        </button>
        }

        <button className="login-btn" onClick={() => {setIsLoggingIn(false); setCreateAccount(false); setLoginActivated(false); setShowUsername(false); setUsernameInput(''); setPasswordInput('');}}>
          Cancel
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

          {/* {(!showUsername) && username && password &&
            <p>
            Error! Your username or password does not meet the requirements. Please try again!
            </p>} */}
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
            </>
}
    </div>  
  );
}
