import express, { json } from "express";
import { router as UserRouter } from "./routes/users.js";
import multer from "multer";
import { renameSync } from "fs";

const app = express();

const authorizationHandler = (req, res, next) => {
  if (req.header("authorization") === "Test") {
    next();
  } else {
    res.status(401).send("UnAuthorized");
  }
};

app.use(express.static("./public"));

app.use(json());
app.use(authorizationHandler);
app.use("/users", UserRouter);

const FakeAPI = () => Promise.reject(new Error("Test AAA"));

app.get("/test", async (req, res, next) => {
  try {
    await FakeAPI();
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

const UPLOAD_DEST = process.env.UPLOAD_DEST || "./public/uploads/";

const upload = multer({ dest: UPLOAD_DEST });

app.post("/file", upload.single("test_file"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any

  // Save user in the DB
  console.log({ ...req.body, avatar_url: `/uploads/${req.file.filename}` });
  res.send("Success");
});

app.listen(process.env.PORT || 8080, () =>
  console.log("Server is running on http://localhost:8080")
);
