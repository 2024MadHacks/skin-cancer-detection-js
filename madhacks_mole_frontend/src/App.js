import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import ImageForm from "./components/ImageForm.js";
import LearnMore from "./components/LearnMore.js";
import Result from "./components/Result.js";
import bgImg from "./assets/images/bgImg.svg";
import Logo from "./assets/images/logo.svg";
import detective from "./assets/images/detective.png";
import eyes from "./assets/images/eyes.png";
import madhacks from "./assets/images/madhacks.png";

function App() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <Router>
            <div
                className="flex flex-col justify-between items-center w-[25.9375rem] h-[56rem] rounded-[1.25rem] md:mt-[3rem] py-[1.75rem] px-[3rem] shadow-2xl overflow-y-scroll"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <img className="" src={Logo} alt="logo" />


                {/* Pass setSubmitted as a prop to ImageForm */}
                <Routes>
                    <Route path="/" element={<ImageForm setSubmitted={setSubmitted} />} />
                    <Route path="/description" element={<LearnMore />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
                <img className="h-[1.3rem]" src={madhacks} alt="logo" />
            </div>
        </Router>
    );
}

export default App;
