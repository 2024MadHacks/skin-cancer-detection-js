import React from "react";
import "../css/learnMore.css";

const descriptions = {
  BKL: "Benign keratosis-like lesions are common, non-cancerous skin growths, often associated with aging. They may appear as spots or small lumps on the skin. They are generally harmless and do not require treatment.",
  MEL: "Melanoma is a type of skin cancer that develops in the pigment-producing cells (melanocytes) of the skin. It can spread quickly, so early detection is crucial. If suspected, it’s important to seek a professional diagnosis as soon as possible.",
  BCC: "Basal cell carcinoma is the most common type of skin cancer, often occurring on skin that has been frequently exposed to the sun. Although it has a low risk of spreading, early treatment is essential.",
  VASC: "Vascular lesions are abnormalities in the blood vessels or capillaries, appearing as red or blue spots on the skin. They are typically benign and not related to cancer. Vascular lesions may be treated for cosmetic reasons.",
  NV: "A nevus, commonly known as a mole, is a pigmented spot on the skin. Most moles are benign with very low risk of developing into melanoma. However, if a mole changes in color, shape, or size, it’s recommended to have it checked by a professional.",
};

function LearnMore() {
  return (
    <div>
      <h2>Skin Lesion Descriptions</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {Object.keys(descriptions).map((key) => (
          <div
            key={key}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              width: "200px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h4>{key}</h4>
            <p>{descriptions[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearnMore;
