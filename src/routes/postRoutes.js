const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;