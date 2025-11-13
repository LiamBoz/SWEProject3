// @ts-ignore: missing module declaration
import "./LoginInput.css";

export function DisplayRecipe({ recipeTitle, recipeInstructions, recipeIngredients }: { recipeTitle: string; recipeInstructions: string; recipeIngredients: string }){
  return (
    <div>
      <h2>{recipeTitle}</h2>
      <h3>Ingredients:</h3>
      <p>{recipeIngredients}</p>
      <h3>Instructions:</h3>
      <p>{recipeInstructions}</p>
    </div>
  );
}