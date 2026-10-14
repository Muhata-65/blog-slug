function auth(req, res, next) {
  const authorization = req.get("authorization");
  const [scheme, token] = authorization ? authorization.split(" ") : [];

  if (scheme !== "Bearer" || token !== process.env.BLOG_API_TOKEN) {
    return res.status(401).json({ error: "A valid Bearer token is required." });
  }

  next();
}

module.exports = auth;
