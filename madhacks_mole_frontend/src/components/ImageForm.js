import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/imageForm.css";
import play from "../assets/images/play.svg";


function ImageForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // 이미지 URL 상태 추가
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5001/image/classify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.predictions);
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleNewUpload = () => {
    setSelectedFile(null);
    setPrediction(null);
    setImageUrl(null);
    setSubmitted(false);
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-1">
            <label className="custom-file-upload">
              <input type="file" onChange={handleFileChange}
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[#6F6662] file:text-[#fff]
      hover:file:scale-105"
              />
            </label>
            <button type="submit"
                    className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
              SEE MY RESULT</button>
          </div>
        </form>
      ) : (
        <>
          {prediction && (
            <div className="flex flex-col items-center">

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
                      Ah, excellent news, partner! <br/>It looks like this mole is nothing to worry about. Case closed, no danger here. But remember, I’ll always be here to keep an eye out for you.
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
                <h3 onClick={handleNewUpload}>Keep Digging</h3>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Link to="/description">
                  <button className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                    Learn More</button>
                </Link>
                <Link to="/description">
                  <button className="font-semibold bg-[#6F6662] hover:bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full">
                    Share Your Findings
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImageForm;
