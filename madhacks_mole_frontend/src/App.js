import React from "react";
import "./App.css";
import UploadImageForm from "./components/uploadImageForm.js";

function App() {
  return (
    <div className="App">
      <h1>Image Classification</h1>
      <UploadImageForm />
    </div>
  );
}

export default App;
