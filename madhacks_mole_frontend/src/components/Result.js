import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import play from "../assets/images/play.svg";

const name = {
    BKL: "Benign Keratosis",
    MEL: "Melanoma",
    BCC: "Basal Cell Carcinoma",
    VASC: "Vascular Lesions",
};

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { prediction, imageUrl } = location.state || {}; // Access state passed via navigate

    if (!prediction) {
        return <div>Loading...</div>;
    }

    const handleNewUpload = () => {
        navigate("/");
    };

    const hasNormal = prediction.some(
        (item) => item.class === "NV" && item.score >= 0.4
    );

    return (
        <div id="result" className="flex flex-col items-center">
            {imageUrl && (
                <img
                    src={imageUrl}
                    width="250px"
                    height="200px"
                    alt="Uploaded"
                    className="uploaded-image rounded-xl border border-2 border-[#A0A0A0]"
                />
            )}

            <ul style={{ listStyleType: "none" }}>
                {/* Show abnormal only if no normal condition is found */}
                {!hasNormal && prediction.some(
                    (item) => item.class !== "NV" && item.score < 0.4
                ) && (
                    <li className="text-[#3F414E] text-[2rem] font-bold text-center py-3 mb-2">
                        Abnormal
                        <p className="text-[#797A7C] text-[1rem] font-normal">
                            Uh-oh, partner! This mole’s looking suspicious. We need to dig deeper and investigate
                            further.
                        </p>
                    </li>
                )}

                {/* Map through predictions and show abnormal items */}
                {!hasNormal && prediction.map((item, index) => (
                    <li key={index} className="mb-1">
                        {item.class !== "NV" ? (
                            <div
                                className="grid grid-cols-2 items-center px-4 text-[#3F414E] text-[1rem] font-semibold">
                                {/* Progress Bar */}
                                {name[item.class]}

                                <div className="relative mb-1 w-full h-5 rounded-full bg-gray-100">
                                    <div
                                        className="h-5 rounded-full bg-[#6F6662]"
                                        style={{ width: `${item.score * 100}%` }}
                                    ></div>
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-300">
                                        {(item.score * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </li>
                ))}

                {/* Show normal condition if found */}
                {hasNormal && (
                    <li className="text-[#3F414E] text-[2rem] font-bold text-center py-2">
                        Normal
                        <p className="text-[#797A7C] text-[1rem] font-normal">
                            Ah, excellent news, partner! <br />
                            It looks like this mole is nothing to worry about. Case closed, no danger here. But
                            remember, I’ll always be here to keep an eye out for you.
                        </p>
                    </li>
                )}
            </ul>
            <div className="flex font-bold justify-center hover:text-[#797A7C] py-2 mt-4">
                <img className="" src={play} alt="play" />
                <h3 onClick={handleNewUpload}>Keep Digging</h3> {/* On click, navigate to "/" */}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Link to="/description">
                    <button
                        className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                        Learn More
                    </button>
                </Link>
                <button
                    data-app="share_buttons"
                    data-link="https://blog.example.com/"
                    className="font-semibold bg-[#6F6662] hover:bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                    Share Your Findings
                </button>
            </div>
        </div>
    );
}

export default Result;
