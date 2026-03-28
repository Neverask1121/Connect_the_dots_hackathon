const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/test");

const Meta = mongoose.model("Meta", {
  title: String,
  description: String,
  filePath: String,
});

app.post("/api/metadata", async (req, res) => {
  const data = new Meta(req.body);
  await data.save();
  res.json(data);
});

app.get("/api/metadata", async (req, res) => {
  const data = await Meta.find();
  res.json(data);
});

app.listen(3001, () => console.log("Metadata service running"));