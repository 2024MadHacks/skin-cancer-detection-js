import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ImageForm from "./components/ImageForm.js";
import LearnMore from "./components/LearnMore.js";

function App() {
  return (
    <Router>
      <div>
        <h1>Meet Detective.Mole</h1>
        <Routes>
          <Route path="/" element={<ImageForm />} />
          <Route path="/description" element={<LearnMore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
