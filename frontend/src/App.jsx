import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="title">ChopMate</h1>
        <button className="logout-btn">Logout</button>
      </div>

      {/* Search */}

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab all ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Recipes
        </button>
        <button
          className={`tab add ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add a Recipe
        </button>
        <button
          className={`tab favorites ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
      </div>
      <div className={`content ${activeTab}`}>
        {activeTab === "all" && (
          <div className="search-section">
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
            />
              <button className="search-btn">Search</button>
          </div>
        )}
        {activeTab === "add" && <p>Form to add a recipe goes here.</p>}
        {activeTab === "favorites" && <p>Your favorite recipes appear here.</p>}
      </div>
    </div>
  );
}

export default App;
