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

app.get("/", (req, res) => {
  res.send(`<form action="/image/classify" method="POST" enctype="multipart/form-data">
    <p>Upload an image:</p>
    <input type="file" name="image" accept="image/*" />
    <button type="submit">Classify</button>
    </form>`);
});

// 이미지 업로드 및 분류
app.post("/image/classify", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // 저장된 이미지 파일의 URL을 구성
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

  return model
    .classify({
      imageUrl,
    })
    .then((predictions) => {
      predictions.forEach((prediction) => {
        prediction.score = parseFloat(prediction.score.toFixed(6));
      });

      console.log(predictions);
      return res.json(predictions);
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
