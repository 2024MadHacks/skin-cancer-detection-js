import React from "react";
import "../css/descriptionList.css";

const DescriptionList = ({ descriptions }) => {
  return (
    <div className="description-list">
      {Object.keys(descriptions).map((key, index) => (
        <div key={index} className="description-card">
          <h4>{key}</h4>
          <p>{descriptions[key]}</p>
        </div>
      ))}
    </div>
  );
};

export default DescriptionList;
