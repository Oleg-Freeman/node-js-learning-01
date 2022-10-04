const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs/promises");

const port = 5000;
const app = express();
const tempDir = path.join(__dirname, "temp");
const products = [];

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/products", async (req, res) => {
  res.json(products);
});

// upload.single('image')
// upload.array('image', 3)
// upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cover', maxCount: 8 }])
app.post("/api/products", upload.single("image"), async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const { path: temFilePath, originalname } = req.file;
    const productDir = path.join(__dirname, "public", "products", originalname);

    await fs.rename(temFilePath, productDir);

    const newProduct = {
      id: uuid(),
      name: req.body.name,
      image: path.join("products", originalname),
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

app.use(async function (req, res) {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.use(function (err, req, res, next) {
  const { status = 500, message = "Internal server error" } = err;
  console.error(err);
  res.status(status).json({ message });
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
