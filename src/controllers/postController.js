const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const post = await Post.create({
      title,
      content,
      tags,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, tags } = req.query;

    const query = {};

    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(",") };

    const posts = await Post.find(query)
      .populate("author", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE POST
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name"
    );

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (
      post.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(post, req.body);
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};