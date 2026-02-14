const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(" hello guys this is my first project , now i will deploy multiple project for brushup my skills to get a better job for my career.<h1> mera name yogeshwar saini hai </h1>");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

