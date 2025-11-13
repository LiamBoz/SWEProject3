// @ts-ignore: missing module declaration
import "./LoginInput.css";
import { useRecipe } from "../hooks/useRecipes.ts";
import type { RecipeResponse } from "../services/recipes.ts";
import { useParams } from "react-router-dom";


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
    DisplayRecipe({ recipe })
);

}

function DisplayRecipe({ recipe } : { recipe: RecipeResponse }) {
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

  function parseDirections(directions: any){
    let directions_str = "";
    for(const key in directions){
      if(key == '.'){
        directions_str += key + "\n";
      }else{
        directions_str += key;
      }
      }
      return directions_str;
    }

    function parseCSV(csv: any){
      let paragraph = "";
      for(const item in csv){
        if(item == ','){
          paragraph += "\n";
        }else{
          paragraph += item;
        }
      }
      return paragraph;
    }

  
 
  return (
    <div>

      <h2>{recipe.recipe_name}</h2>

      {recipe.overview != "NaN" &&
      <p>Overview: {parseCSV(recipe.overview)}</p>
      }

      {recipe.total_time != "NaN" && 
      <p>Total Time: {recipe.total_time}</p>
      }
      {recipe.prep_time != "NaN" && 
      <p>Prep Time: {recipe.prep_time}</p>
      }
      {recipe.cook_time != "NaN" && 
      <p>Cook Time: {recipe.cook_time}</p>
      }

       {recipe.servings != "NaN" && 
      <p>Servings: {recipe.servings}</p>
      }

      {recipe.rating != "NaN" && 
      <p>Rating: {recipe.rating} / 5</p>
      }

      {recipe.nutrition != "NaN" && <p>Nutrition: {parseCSV(recipe.nutrition)}</p>}

      {recipe.img_src != "NaN" && 
      <img src={recipe.img_src} alt={recipe.recipe_name} />
      }

    <p>Ingredients: {recipe.ingredients}</p>

    <p>Directions: {parseDirections(recipe.directions)}</p>
    </div>
  );
}