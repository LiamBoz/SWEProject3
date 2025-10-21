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
    Ingredients: "Chicken breast, fettuccine, heavy cream, butter, garlic, parmesan",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
  {
    url: "https://example.com/recipe3",
    Name: "Vegetable Stir Fry",
    "Prep Time": "15 mins",
    "Cook Time": "10 mins",
    "Total Time": "25 mins",
    Ingredients: "Broccoli, bell peppers, carrots, soy sauce, garlic, ginger, oil",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="title">Chopify</h1>
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
          <>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search recipes..."
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>

            <div className="recipe-container">
              {recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <img
                    src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.jUfCu2A6ilKJAdybISEMgwHaHa%3Fcb%3D12%26pid%3DApi&f=1&ipt=35a22f7cbedcd66e44cebe192ac5eada28926f478cfc69e2212f73bfbb1c9540&ipo=images,${recipe.Name}`}
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
              ))}
            </div>
          </>
        )}
        {activeTab === "add" && 
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

        }
        {activeTab === "favorites" && <p>Your favorite recipes appear here.</p>}
      </div>
    </div>
  );
}

export default App;
