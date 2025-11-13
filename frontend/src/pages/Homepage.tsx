// @ts-ignore: missing module declaration for plain CSS imports
import "../App.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes, useRecipe } from "../hooks/useRecipes.ts";
import { usePostRecipe } from "../hooks/postRecipe.ts";
import type { RecipeCreate } from "../services/recipes.ts";

export function Homepage(){
  const [activeTab, setActiveTab] = useState("all");

  const { data: recipes = [], isLoading, error } = useRecipes();
  console.log(recipes)
  const navigate = useNavigate();
  const { mutate } = usePostRecipe();

  const [newRecipe, setNewRecipe] = useState<RecipeCreate>({
    recipe_name: "",
    prep_time: "",
    cook_time: "",
    total_time: "",
    servings: 0,
    ingredients: "",
    directions: ""
  });

  function handleLogout(){
    //isAuthenticated must be set to false here
    navigate('/');
  }

  function handleAddRecipe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();             // STOP default page reload
    mutate(newRecipe);             // call your mutation
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
        ...prev,
        [name]: value
    }));
};

  // const testRecipe: RecipeCreate = {
  //   recipe_name: "Test Recipe",
  //   prep_time: "30 mins",
  //   cook_time: "1 hr",
  //   total_time: "1 hour 30 mins",
  //   servings: 5,
  //   ingredients: "ingredient 1, ingredient 2, ingredient 3",
  //   directions: "step 1 step 2 step 3"
  // };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1 className="title">Chopify</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
                <div key={index} className="recipe-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                  <img
                    src={recipe.img_src}
                    alt={recipe.recipe_name}
                    className="recipe-image"
                  />
                  <h3 className="recipe-title">{recipe.recipe_name}</h3>
                  <p className="recipe-desc">
                  </p>
                  <a
                    // href={recipe.url}
                    // target="_blank"
                    // rel="noreferrer"
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
          <form onSubmit={handleAddRecipe}>
            <label>Recipe Name</label>
            <input 
              type="text"
              name="recipe_name"
              value={newRecipe.recipe_name}
              onChange={handleInputChange}
              placeholder="e.g. Spaghetti Carbonara" 
            />

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