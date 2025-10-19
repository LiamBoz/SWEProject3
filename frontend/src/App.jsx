import { useState } from "react";
import "./App.css";

function App() {
 

  return (
        <LoginInput />
  );
}

function LoginInput() {
  const [ usernameInput, setUsernameInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ showUsername, setShowUsername] = useState(false);
  const [ loginActivated, setLoginActivated ] = useState(false);


  function saveUsernameText(event){
    //saving username text
    setUsernameInput(event.target.value);
  }

  function savePasswordText(event){
    //saving password text
    setPasswordInput(event.target.value);
  }

  function login(){
    //saving login input to state variables username and password
    setUsername(usernameInput);
    setPassword(passwordInput);

    //username can only contain letters upper or lowercase
    const validUsernameChars =  /^[A-Za-z]+$/;
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
    
    //If login is clicked, error messages can be shown
    setLoginActivated(true);

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
        className="logout-btn">
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

          {showUsername && username && password &&
          <p>
            My username is {username}
          </p>}

          {showUsername && username && password &&
          <p>
            My password is {password}  
          </p>}

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



  // const [activeTab, setActiveTab] = useState("all");

  // return (
  //   <div className="app">
  //     {/* Header */}
  //     <div className="header">
  //       <h1 className="title">Chopify</h1>
  //       <button className="logout-btn">Logout</button>
  //     </div>

  //     {/* Search */}
  //     <div className="search-section">
  //       <input
  //         type="text"
  //         placeholder="Search recipes..."
  //         className="search-input"
  //       />
  //       <button className="search-btn">Search</button>
  //     </div>

  //     {/* Tabs */}
  //     <div className="tabs">
  //       <button
  //         className={`tab ${activeTab === "all" ? "active" : ""}`}
  //         onClick={() => setActiveTab("all")}
  //       >
  //         All Recipes
  //       </button>
  //       <button
  //         className={`tab ${activeTab === "add" ? "active" : ""}`}
  //         onClick={() => setActiveTab("add")}
  //       >
  //         Add a Recipe
  //       </button>
  //       <button
  //         className={`tab ${activeTab === "favorites" ? "active" : ""}`}
  //         onClick={() => setActiveTab("favorites")}
  //       >
  //         Favorites
  //       </button>
  //     </div>

  //     {/* Main content area */}
  //     <div className="content">
  //       {activeTab === "all" && <p>All recipes will show up here.</p>}
  //       {activeTab === "add" && <p>Form to add a recipe goes here.</p>}
  //       {activeTab === "favorites" && <p>Your favorite recipes appear here.</p>}
  //     </div>
  //   </div>
  // );


export default App;
