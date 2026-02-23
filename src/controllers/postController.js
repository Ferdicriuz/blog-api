const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};