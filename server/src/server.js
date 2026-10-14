require("dotenv").config();

const express = require("express");
const logger = require("./middleware/logger");
const postsRouter = require("./routes/posts");

if (!process.env.BLOG_API_TOKEN) {
  throw new Error("BLOG_API_TOKEN must be set before starting the API.");
}

const app = express();
const port = process.env.PORT || 5000;

app.use(logger);
app.use(express.json());
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(port, () => {
  console.log(`Blog API listening on http://localhost:${port}`);
});
