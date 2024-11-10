import React, { useState } from "react";
import "../css/uploadImageForm.css";
import DescriptionList from "./descriptionList";

const descriptions = {
  BKL: "Benign keratosis-like lesions are common, non-cancerous skin growths, often associated with aging. They may appear as spots or small lumps on the skin. They are generally harmless and do not require treatment.",
  MEL: "Melanoma is a type of skin cancer that develops in the pigment-producing cells (melanocytes) of the skin. It can spread quickly, so early detection is crucial. If suspected, it’s important to seek a professional diagnosis as soon as possible.",
  BCC: "Basal cell carcinoma is the most common type of skin cancer, often occurring on skin that has been frequently exposed to the sun. Although it has a low risk of spreading, early treatment is essential.",
  VASC: "Vascular lesions are abnormalities in the blood vessels or capillaries, appearing as red or blue spots on the skin. They are typically benign and not related to cancer. Vascular lesions may be treated for cosmetic reasons.",
  NV: "A nevus, commonly known as a mole, is a pigmented spot on the skin. Most moles are benign with very low risk of developing into melanoma. However, if a mole changes in color, shape, or size, it’s recommended to have it checked by a professional.",
};

function UploadImageForm() {
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
      console.log("imageUrl", imageUrl);
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

              <DescriptionList descriptions={descriptions} />
              <button onClick={handleNewUpload}>Upload New Image</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UploadImageForm;
