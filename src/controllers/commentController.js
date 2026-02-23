const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const { content, postId } = req.body;

  const comment = await Comment.create({
    content,
    post: postId,
    author: req.user.id
  });

  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "name");

  res.json(comments);
};