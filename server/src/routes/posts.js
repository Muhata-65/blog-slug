const express = require("express");
const posts = require("../data/posts");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:slug", auth, (req, res) => {
  const post = posts.find((item) => item.slug === req.params.slug);

  if (!post) {
    return res.status(404).json({ error: "Post not found." });
  }

  res.json(post);
});

module.exports = router;
