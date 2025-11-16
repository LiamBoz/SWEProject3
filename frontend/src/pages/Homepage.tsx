// @ts-ignore: missing module declaration for plain CSS imports
import "../App.css";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes, useRecipe } from "../hooks/useRecipes.ts";
import { usePostRecipe } from "../hooks/postRecipe.ts";
import type { RecipeCreate } from "../services/recipes.ts";
import { clearAuth } from "../Auth.ts"
import { LogoutButton } from "../components/LogoutButton";
import Fuse from 'fuse.js';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Homepage(){
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [minRating, setMinRating] = useState<string>("any");
  const [maxTime, setMaxTime] = useState<string>("any");

  const { data: recipes = [], isLoading, error } = useRecipes();

  const getTotalMinutes = (timeStr?: string): number | undefined => {
    if (!timeStr) return undefined;
    const match = timeStr.match(/(\d+)\s*mins?/i);
    return match ? parseInt(match[1], 10) : undefined;
  };

  const fuse = useMemo(
    () =>
      new Fuse(recipes, {
        keys: ["recipe_name"],
        threshold: 0.2,
      }),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    const base = searchQuery.trim()
      ? fuse.search(searchQuery).map((result) => result.item)
      : recipes;

    return base.filter((recipe: any) => {
      if (minRating !== "any") {
        const min = parseFloat(minRating);
        const rating = typeof recipe.rating === "number" ? recipe.rating : 0;
        if (rating < min) return false;
      }

      if (maxTime !== "any") {
        const max = parseInt(maxTime, 10);
        const minutes = getTotalMinutes(recipe.total_time);
        if (minutes != null && minutes > max) return false;
      }

      return true;
    });
  }, [recipes, fuse, searchQuery, minRating, maxTime]);

  //console.log(recipes)
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
	clearAuth();
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
		  <LogoutButton />
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
		<div className="search-section flex items-center w-full justify-center gap-1 relative bottom-2.5">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input bg-white text-black w-[600px]"
              />

		      <div className="flex gap-4 flex-wrap absolute right-20">
                <div className="flex flex-col gap-1">
                  <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger className="w-[140px] bg-white">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="4.0">4.0+</SelectItem>
                      <SelectItem value="4.5">4.5+</SelectItem>
                      <SelectItem value="4.75">4.75+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <Select value={maxTime} onValueChange={setMaxTime}>
                    <SelectTrigger className="w-[160px] bg-white">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Time</SelectItem>
                      <SelectItem value="15">≤ 15 mins</SelectItem>
                      <SelectItem value="30">≤ 30 mins</SelectItem>
                      <SelectItem value="45">≤ 45 mins</SelectItem>
                      <SelectItem value="60">≤ 60 mins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="recipe-container">
              {filteredRecipes.map((recipe, index) => (
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
          <h2 className="add-recipe-header">Add a Recipe</h2>
          <form onSubmit={handleAddRecipe}>
            <label>Recipe Name</label>
            <Input 
              type="text"
              name="recipe_name"
              className="placeholder-txt"
              value={newRecipe.recipe_name}
              onChange={handleInputChange}
              placeholder="e.g. Spaghetti Carbonara" 
            />

            {/* ingredients (csv), directions - end with a period, prep time, cook time, servings */}

            {/* <label>Description</label>
            <textarea className="placeholder-txt" placeholder="Brief description of your recipe"></textarea> */}

            <label>Ingredients (comma separated)</label>
            <Input className="placeholder-txt"  placeholder="e.g. pasta, eggs, cheese, pancetta"></Input>

            <label>Directions (Must end with a period)</label>
            <Input className="placeholder-txt" placeholder="Step-by-step instructions."></Input>

            <div className="time-inputs">
              <label>Prep Time (min)</label>
              <Input type="number" min="0" />
              <label>Cook Time (min)</label>
              <Input type="number" min="0" />
              <label>Total Time (min)</label>
              <Input type="number" min="0" />
              <label>Servings</label>
              <Input type="number" min="1" />
            </div>

            <label>Image URL (optional)</label>
            <Input className="placeholder-txt"  type="text" placeholder="https://example.com/recipe.jpg" />

            <button type="submit">Add Recipe</button>
          </form>
        </div>

        }
        {activeTab === "favorites" && <p>Your favorite recipes appear here.</p>}
      </div>
    </div>
  );
}
