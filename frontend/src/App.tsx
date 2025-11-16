import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginInput } from "./pages/LoginInput.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { DisplayRecipeHook } from "./pages/DisplayRecipe.tsx";
import { Toaster } from "react-hot-toast";
import { RequireAuth } from "./RequireAuth.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginInput />} />
        <Route element={<RequireAuth />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/recipe/:id" element={<DisplayRecipeHook />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
