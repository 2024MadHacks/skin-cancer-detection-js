const express = require("express");
const cors = require("cors");
const multer = require("multer");
const TeachableMachine = require("@sashido/teachablemachine-node");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const model = new TeachableMachine({
  modelUrl: process.env.MODEL_URL,
});

const app = express();
app.use(cors());
const port = process.env.PORT || 5001;

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post("/image/classify", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = path.join(__dirname, "uploads", req.file.filename);
  // const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  const imageUrl = `https://skin-cancer-detection-js.onrender.com/uploads/${req.file.filename}`;

  return model
    .classify({
      imageUrl,
    })
    .then((predictions) => {
      predictions.forEach((prediction) => {
        prediction.score = parseFloat(prediction.score.toFixed(6));
      });

      res.json({ predictions, imageUrl });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
