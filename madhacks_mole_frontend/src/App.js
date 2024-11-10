import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ImageForm from "./components/ImageForm.js";
import LearnMore from "./components/LearnMore.js";
import bgImg from "./assets/images/bgImg.svg";
import Logo from "./assets/images/logo.svg";
import detective from "./assets/images/detective.png";
import eyes from "./assets/images/eyes.png";
import madhacks from "./assets/images/madhacks.png";

function App() {
    const [showMain1, setShowMain1] = useState(true); // State for main-1 visibility

    useEffect(() => {
        // Toggle visibility of main-1 and main-2 every 3 seconds
        const interval = setInterval(() => {
            setShowMain1((prev) => !prev); // Toggle between main-1 and main-2
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Router>
            <div
                className="flex flex-col justify-between items-center w-[25.9375rem] h-[56rem] rounded-[1.25rem] md:mt-[3rem] py-[1.75rem] px-[3rem] shadow-2xl overflow-y-scroll"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <img className="" src={Logo} alt="logo" />
                <div id="main-1" className={showMain1 ? "" : "hidden"}>
                    {/* Main 1 */}
                    <div className="">
                        <div className="flex flex-col items-center mt-10">
                            <h1 className="text-[#3F414E] text-[2rem] font-bold">Ah, greetings!</h1>
                            <img className="w-[14rem]" src={detective} alt="detective" />
                        </div>
                        <p className="text-[#3F414E] text-[1.4rem] font-medium text-center">
                            I’m <span className="font-bold">Detective Mole</span>,<br />
                            your trusty investigator.
                        </p>
                        <p className="text-[#797A7C] text-[1rem] font-regular text-center mt-2">
                            Let’s get to the bottom of this mystery and uncover the truth about your skin health!
                        </p>
                    </div>
                </div>
                <div id="main-2" className={showMain1 ? "hidden" : ""}>
                    {/* Main 2 */}
                    <div className="flex flex-col items-center my-10">
                        <img className="h-[6rem]" src={eyes} alt="eyes" />
                        <h1 className="text-[#3F414E] text-[2rem] font-bold text-center">
                            Upload Your <br />
                            Mole Mystery!
                        </h1>
                    </div>
                    <p className="text-[#797A7C] text-[1rem] font-regular text-center mt-2">
                        Skin cancer is the <span className="font-bold">most common cancer</span> in the United States, with{" "}
                        <span className="font-bold">over 9,500 new cases </span> diagnosed every day. But here’s the good news—
                        early detection can increase the 5-year survival rate to an impressive{" "}
                        <span className="font-bold -scale-y-105">99%!</span>
                    </p>
                </div>

                <Routes>
                    <Route path="/" element={<ImageForm />} />
                    <Route path="/description" element={<LearnMore />} />
                </Routes>
                <img className="h-[1.3rem]" src={madhacks} alt="logo" />
            </div>
        </Router>
    );
}

export default App;
