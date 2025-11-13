import { useState } from "react";
import "./App.css";

const recipes = [
  {
    url: "https://example.com/recipe1",
    Name: "Spaghetti Carbonara",
    "Prep Time": "15 mins",
    "Cook Time": "20 mins",
    "Total Time": "35 mins",
    Ingredients:
      "Spaghetti, eggs, pancetta, parmesan cheese, black pepper, salt",
  },
  {
    url: "https://example.com/recipe2",
    Name: "Chicken Alfredo",
    "Prep Time": "10 mins",
    "Cook Time": "25 mins",
    "Total Time": "35 mins",
    Ingredients:
      "Chicken breast, fettuccine, heavy cream, butter, garlic, parmesan",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients:
      "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  // Helper to convert "35 mins" -> 35
  const getTimeValue = (timeStr) => {
    return parseInt(timeStr.replace(/\D/g, "")) || 0;
  };

  // Filter recipes based on search term, ingredient, and time
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.Name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIngredient =
      ingredientFilter === "all" ||
      recipe.Ingredients.toLowerCase().includes(ingredientFilter.toLowerCase());

    const totalTime = getTimeValue(recipe["Total Time"]);
    const matchesTime =
      timeFilter === "all" ||
      (timeFilter === "under30" && totalTime < 30) ||
      (timeFilter === "30to60" && totalTime >= 30 && totalTime <= 60) ||
      (timeFilter === "over60" && totalTime > 60);

    return matchesSearch && matchesIngredient && matchesTime;
  });

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="title">Chopify</h1>
        <button className="logout-btn">Logout</button>
      </div>

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
          <>
            {/* Search & Filters */}
            <div className="search-section">
              <input
                type="text"
                placeholder="Search recipes..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Ingredient Filter */}
              <select
                className="filter-dropdown"
                value={ingredientFilter}
                onChange={(e) => setIngredientFilter(e.target.value)}
              >
                <option value="all">All Ingredients</option>
                <option value="chicken">Chicken</option>
                <option value="vegetable">Vegetable</option>
                <option value="pasta">Pasta</option>
                <option value="garlic">Garlic</option>
              </select>

              {/* Time Filter */}
              <select
                className="filter-dropdown"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Times</option>
                <option value="under30">Under 30 mins</option>
                <option value="30to60">30–60 mins</option>
                <option value="over60">Over 60 mins</option>
              </select>
            </div>

            {/* Recipes */}
            <div className="recipe-container">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                    <img
                      src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.jUfCu2A6ilKJAdybISEMgwHaHa%3Fcb%3D12%26pid%3DApi&f=1`}
                      alt={recipe.Name}
                      className="recipe-image"
                    />
                    <h3 className="recipe-title">{recipe.Name}</h3>
                    <p className="recipe-desc">
                      ⏱ {recipe["Total Time"]} | 🍽{" "}
                      {recipe.Ingredients.split(",").slice(0, 3).join(", ")}...
                    </p>
                    <a
                      href={recipe.url}
                      target="_blank"
                      rel="noreferrer"
                      className="recipe-link"
                    >
                      View Recipe →
                    </a>
                  </div>
                ))
              ) : (
                <p>No recipes found.</p>
              )}
            </div>
          </>
        )}

        {/* Add Recipe Tab */}
        {activeTab === "add" && (
          <div className="add-recipe-form">
            <h2>Add a Recipe</h2>
            <form>
              <label>Recipe Name</label>
              <input type="text" placeholder="e.g. Spaghetti Carbonara" />

              <label>Description</label>
              <textarea placeholder="Brief description of your recipe"></textarea>

              <label>Ingredients (comma separated)</label>
              <textarea placeholder="e.g. pasta, eggs, cheese, pancetta"></textarea>

              <label>Instructions</label>
              <textarea placeholder="Step-by-step instructions"></textarea>

              <div className="time-inputs">
                <label>Prep Time (min)</label>
                <input type="number" min="0" />
                <label>Cook Time (min)</label>
                <input type="number" min="0" />
                <label>Servings</label>
                <input type="number" min="1" />
              </div>

              <label>Image URL (optional)</label>
              <input type="text" placeholder="https://example.com/recipe.jpg" />

              <button type="submit">Add Recipe</button>
            </form>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && <p>Your favorite recipes appear here.</p>}
      </div>
    </div>
  );
}

export default App;
