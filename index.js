const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>User Management System | AWS RDS</title>
</head>
<body>
<h1>🚀 Node App running via Jenkins + Docker</h1>
<h2>My name is Kunal Singh</h2>
</body>
</html>`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT,"0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});



