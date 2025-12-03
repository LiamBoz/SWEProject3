// @ts-ignore: missing module declaration
import "./DisplayRecipe.css";
// @ts-ignore: missing module declaration
import "../App.css";
import { useRecipe, delRecipe } from "../hooks/useRecipes.ts";
import type { RecipeResponse } from "../services/recipes.ts";
import { useParams } from "react-router-dom";
import { HeartIcon } from "../components/ui/icons/heroicons-heart"
import { useId, useState, useEffect } from "react";
import { useFavoriteRecipe, useUnfavoriteRecipe, useIsFavorited } from "../hooks/users.ts";
import { getAuth, isAdmin } from "../Auth.ts";


export function DisplayRecipeHook(){
  //call hook
  //call DisplayRecipe with recipe data
  const { id } = useParams< {id: string} >();

  const recipeId = Number(id);

  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useRecipe(recipeId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <DisplayRecipe recipe={recipe}  />
);

}

function DisplayRecipe({ recipe } : { recipe: RecipeResponse }) {
  const { username } = getAuth();
  const { is_admin } = isAdmin();
  const { data: isFavorite, isLoading, error } = useIsFavorited(username, recipe.id);
  let [favorite, setFavorite] =  useState(isFavorite);

  useEffect(() => {
    if (isFavorite !== undefined) {
      setFavorite(isFavorite);
    }
  }, [isFavorite]);

  const recipeID = recipe.id;

  const { mutate: favoriteMutate } = useFavoriteRecipe();
  const { mutate: unfavoriteMutate } = useUnfavoriteRecipe();

  function toggleFavorite(username: string, recipeId: number){
    setFavorite(!favorite);
    if(!favorite){
      //make it a favorite
      favoriteMutate(
        { username, recipeId },
        {
          onError: () => setFavorite(favorite), // rollback
        }
      );
    }else{
      //remove
      unfavoriteMutate(
        { username, recipeId },
        {
          onError: () => setFavorite(favorite), // rollback
        }
      );
    }
  }
  /*
  recipe_name
  total_time
  prep_time
  cook_time
  rating
  img_src
  servings
  ingredients
  directions - by period senetnces
  nutrition (csv)
  overview - with additional time, csv
  */

  function parseDirections(directions: string){
    let directions_str = "";
    let last_period = 0;
    for(let i = 0; i < directions.length; i++){
      if(directions[i] == '.'){
        last_period = i;
        directions_str += directions[i];
      }else{
        directions_str += directions[i];
      }
    }

    let author = directions_str.slice(last_period+1);
    directions_str = directions_str.slice(0, last_period+1);
    

    // directions_str = directions;
  
      return [directions_str, author]
    }

    function parseCSV(csv: string){
      let paragraph = "";
      for(const item of csv){
        if(item == ','){
          paragraph += "\n";
        }else{
          paragraph += item;
        }
      }
      return paragraph;
    }

  
 
  return (
    <div className="display-recipe-page">
      <h1 className="title">Chopify</h1>
      {/* Title */}
      <div className="header-favorite">
      <h2 className="recipe-name">{recipe.recipe_name}</h2>
      <HeartIcon size={30} onClick={() => toggleFavorite(username, recipeID)} favorite={favorite}/>
      </div>

      {/* Image */}
      {recipe.img_src != "NaN" && 
      <div className="recipe-pic">
      <img src={recipe.img_src} alt={recipe.recipe_name} />
      </div>
      }

      {/* Author */}
      {parseDirections(recipe.directions)[1] &&
        <p className="recipe-info">Author: {parseDirections(recipe.directions)[1]}</p>
        }

      {/* Rating */}
      {recipe.rating != 0 && 
      <p className="recipe-info">Rating: {recipe.rating} / 5</p>
      }

      {/* Overview */}
      {recipe.overview != "NaN" &&
      <>
      <p className="category-title">Overview:</p>
      <p  className="recipe-info" style={{whiteSpace: "pre-line"}}>{parseCSV(recipe.overview)}</p>
      </>
      }

      {recipe.total_time != "NaN" && 
      recipe.overview == "NaN" &&
      <>
        <p className="category-title">Overview:</p>
        <p className="recipe-info">Total Time: {recipe.total_time}</p>
      </>

      }
      {recipe.prep_time != "NaN" && 
      recipe.overview == "NaN" &&
      <p className="recipe-info">Prep Time: {recipe.prep_time}</p>
      }
      {recipe.cook_time != "NaN" && 
      recipe.overview == "NaN" &&
      <p className="recipe-info">Cook Time: {recipe.cook_time}</p>
      }

       {recipe.servings && 
       recipe.overview == "NaN" &&
      <p className="recipe-info">Servings: {recipe.servings}</p>
      }

    <p className="category-title">Ingredients:</p>
    <p className="recipe-info">{recipe.ingredients}</p>
    <p className="category-title">Directions:</p>
    <p className="recipe-info" style={{whiteSpace: "pre-line"}}>{parseDirections(recipe.directions)[0]}</p>

     {recipe.nutrition != "NaN" && 
      <>
      <p className="category-title">Nutrition:</p> 
      <p className="recipe-info" style={{whiteSpace: "pre-line"}}>{parseCSV(recipe.nutrition)}</p>
      </>
      }
    </div>
  );
}
