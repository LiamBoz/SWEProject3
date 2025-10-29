import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { LoginInput } from "./pages/LoginInput";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginInput />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes> 
      </Router>
  );
}

export default App;
