import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginInput } from "./pages/LoginInput.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { DisplayRecipe } from "./pages/DisplayRecipe.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginInput />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* will change routing later */}
          <Route path="/recipe" element={<DisplayRecipe
            recipeTitle={"Sample Recipe"}
            recipeInstructions={"1. Do this.\n2. Do that."}
            recipeIngredients={"- Ingredient 1\n- Ingredient 2"}
          />} />
        </Routes> 
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
  );
}

export default App;