const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  updatePost
} = require("../controllers/postController");

router.get("/", getPosts);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);

module.exports = router;