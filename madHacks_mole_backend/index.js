const express = require("express");
const cors = require("cors");
const multer = require("multer");
const TeachableMachine = require("@sashido/teachablemachine-node");
const path = require("path");
const fs = require("fs");

const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/gLKUYyKvf/",
});

const app = express();
app.use(cors());
const port = 5001;

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

  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

  return model
    .classify({
      imageUrl,
    })
    .then((predictions) => {
      predictions.forEach((prediction) => {
        prediction.score = parseFloat(prediction.score.toFixed(6));
      });

      res.json({ predictions, imageUrl });

      // fs.unlink(imagePath, (err) => {
      //   if (err) console.error("Failed to delete image:", err);
      // });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Something went wrong!");
    });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
