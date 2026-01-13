const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use(express.json());

let questions = require("./questions.json");

// Fetch Question
app.get("/api/question/:points/:number", (req, res) => {
  const { points, number } = req.params;
  if (!questions[points] || !questions[points][number]) {
    return res.status(404).json(null);
  }
  res.json(questions[points][number]);
});

// Add Question
app.post("/api/question", (req, res) => {
  const { points, number, text, options, answer, reference } = req.body;
  if (!questions[points]) questions[points] = {};
  questions[points][number] = { text, options, answer, reference };
  res.json({ status: "saved" });
});

// IMPORTANT: Route "/" to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
