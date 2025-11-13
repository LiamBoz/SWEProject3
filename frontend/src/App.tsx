import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginInput } from "./pages/LoginInput.tsx";
import { Homepage } from "./pages/Homepage.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginInput />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes> 
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
  );
}

export default App;