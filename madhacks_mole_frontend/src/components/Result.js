import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import play from "../assets/images/play.svg";

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
                {prediction.some(
                    (item) => item.class === "NV" && item.score >= 0.6
                ) ? (
                    <li className="text-[#3F414E] text-[2rem] font-bold text-center py-2">Normal
                        <p className="text-[#797A7C] text-[1rem] font-normal">
                            Ah, excellent news, partner! <br />
                            It looks like this mole is nothing to worry about. Case closed, no danger here. But remember, I’ll always be here to keep an eye out for you.
                        </p>
                    </li>
                ) : (
                    prediction.map((item, index) => (
                        <li key={index}>{`${item.class}: ${item.score}`}</li>
                    ))
                )}
            </ul>
            <div className="flex font-bold justify-center hover:text-[#797A7C] py-2">
                <img className="" src={play} alt="play" />
                <h3 onClick={handleNewUpload}>Keep Digging</h3> {/* On click, navigate to "/" */}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Link to="/description">
                    <button className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                        Learn More
                    </button>
                </Link>
                <Link to="/description">
                    <button className="font-semibold bg-[#6F6662] hover:bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                        Share Your Findings
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Result;
