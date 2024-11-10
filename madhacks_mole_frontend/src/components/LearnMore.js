import React from "react";
import { useNavigate } from "react-router-dom";

import "../css/learnMore.css";

const name = {
  BKL: "Benign Keratosis",
  MEL: "Melanoma",
  BCC: "Basal Cell Carcinoma",
  VASC: "Vascular Lesions",
};

const descriptions = {
    BKL: "like Lesions Common, non-cancerous skin growths, often with aging. Generally harmless, no treatment needed.",
    MEL: "Skin cancer from pigment-producing cells. Can spread quickly. Early detection is key.",
    BCC: "Most common skin cancer, often on sun-exposed skin. Low spread risk, early treatment essential.",
    VASC: "Red/blue spots from blood vessel abnormalities. Benign, usually for cosmetic treatment.",
};

// const images = {
//     BKL: "../assets/images/play.svg",
//     MEL: "../assets/images/play.svg",
//     BCC: "../assets/images/play.svg",
//     VASC: "../assets/images/play.svg",
// };

function LearnMore() {
    const navigate = useNavigate();
    const handleBackToTest = () => {
        navigate("/"); // Navigate to the home page ("/") when the button is clicked
    };

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-[2rem] text-[#31211C] font-bold">Skin Lesions</h2>
      <div>
        {Object.keys(descriptions).map((key) => (
            <div key={key} className="lesion-card bg-white rounded-xl shadow-md mb-3 p-5 text-[#6F6662] hover:scale-105">
                {/*<img*/}
                {/*    src={images[key]}*/}
                {/*    alt={name[key]}*/}
                {/*    style={{ width: "100%", height: "auto", borderRadius: "8px" }}*/}
                {/*/>*/}
                <h4 className="text-[1rem] font-bold">{name[key]}</h4>
                <p>{descriptions[key]}</p>
            </div>
        ))}
      </div>
        <button
            onClick={handleBackToTest}
            className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
            BACK TO THE TEST</button>
    </div>
  );
}

export default LearnMore;
