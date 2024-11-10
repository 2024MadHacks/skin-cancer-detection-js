import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/imageForm.css";

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
      <h2>Upload an image to classify</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label className="custom-file-upload">
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Classify</button>
        </form>
      ) : (
        <>
          {prediction && (
            <div>
              <h3>Prediction Result:</h3>

              {imageUrl && (
                <img
                  src={imageUrl}
                  width="300px"
                  height="300px"
                  alt="Uploaded"
                  className="uploaded-image"
                />
              )}

              <ul style={{ listStyleType: "none" }}>
                {prediction.some(
                  (item) => item.class === "NV" && item.score >= 0.6
                ) ? (
                  <li>This is a normal mole.</li>
                ) : (
                  prediction.map((item, index) => (
                    <li key={index}>{`${item.class}: ${item.score}`}</li>
                  ))
                )}
              </ul>

              <button onClick={handleNewUpload}>Upload New Image</button>
              <Link to="/description">
                <button>Learn More</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImageForm;
