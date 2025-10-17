import { useState } from "react";
import "./App.css";

function App() {
 

  return (
    
        <LoginInput />
  );
}

function LoginInput() {
  const [ loginInput, setLoginInput ] = useState('');
  const [ passwordInput, setPasswordInput ] = useState('');
  const [ showUsername, setShowUsername] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function saveInputText(event){
    setLoginInput(event.target.value);
  }

  function savePasswordText(event){
    setPasswordInput(event.target.value);
  }

  function login(){
    setUsername(loginInput);
    setPassword(passwordInput);
    setPasswordInput('');
    setLoginInput('');
    setShowUsername(true);
  }

  return(
    <div className="welcome">
        <p className="welcome-message">
          Welcome to Chopify
        </p>
      {/*<form onSubmit={handleInput}> */}
        <div className="login-bar">
           <input
          type = "text"
          placeholder="Username"
          onChange={saveInputText}
          value={loginInput}
          className="username-input"
          />
          </div>

        <div className="login-bar">
            <input 
              type="password"
              placeholder="Password"
              onChange={savePasswordText}
              value={passwordInput}
              className="password-input"
          />
          </div>

        <button 
        type="submit"
        onClick={login}
        className="logout-btn">
            Login
          </button>
          {/* </form> */}

          {showUsername && username && password &&
          <p>
            My username is {username}
          </p>}

          {showUsername && username && password &&
          <p>
            My password is {password}  
          </p>}
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
