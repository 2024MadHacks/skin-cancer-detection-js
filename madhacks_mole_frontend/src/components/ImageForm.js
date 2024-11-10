import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/imageForm.css";
import detective from "../assets/images/detective.png";
import eyes from "../assets/images/eyes.png";

function ImageForm({ setSubmitted }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${backendUrl}/image/classify`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.predictions);
      setImageUrl(data.imageUrl);
      navigate("/result", {
        state: { prediction: data.predictions, imageUrl: data.imageUrl },
      }); // Pass data to /result route
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

  const [showMain1, setShowMain1] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMain1((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="main-1" className={showMain1 ? "" : "hidden"}>
        <div className="">
          <div className="flex flex-col items-center mt-10">
            <h1 className="text-[#3F414E] text-[2rem] font-bold">
              Ah, greetings!
            </h1>
            <img className="w-[14rem]" src={detective} alt="detective" />
          </div>
          <p className="text-[#3F414E] text-[1.4rem] font-medium text-center">
            I’m <span className="font-bold">Detective Mole</span>,<br />
            your trusty investigator.
          </p>
          <p className="text-[#797A7C] text-[1rem] font-regular text-center mt-2">
            Let’s get to the bottom of this mystery and uncover the truth about
            your skin health!
          </p>
        </div>
      </div>
      <div id="main-2" className={showMain1 ? "hidden" : ""}>
        <div className="flex flex-col items-center my-10">
          <img className="h-[6rem]" src={eyes} alt="eyes" />
          <h1 className="text-[#3F414E] text-[2rem] font-bold text-center">
            Upload Your <br />
            Mole Mystery!
          </h1>
        </div>
        <p className="text-[#797A7C] text-[1rem] font-regular text-center mt-2">
          Skin cancer is the{" "}
          <span className="font-bold">most common cancer</span> in the United
          States, with <span className="font-bold">over 9,500 new cases </span>{" "}
          diagnosed every day. But here’s the good news— early detection can
          increase the 5-year survival rate to an impressive{" "}
          <span className="font-bold -scale-y-105">99%!</span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex flex-col gap-1">
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#6F6662] file:text-[#fff]
              hover:file:scale-105"
            />
          </label>
          <button
            type="submit"
            className="font-semibold bg-[#31211C] rounded-[2.3rem] text-[1rem] text-[#fff] py-4 hover:bg-transparent hover:text-[#31211C] border border-[#31211C] w-full"
          >
            SEE MY RESULT
          </button>
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
