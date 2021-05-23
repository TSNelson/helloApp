const express = require('express');
const postController = require('../controllers/postController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
      .get(postController.getAllPosts)
      .post(requireAuth, postController.createPost);

router.route('/:id')
      .get(postController.getOnePost)
      .patch(requireAuth, postController.updatePost)
      .delete(requireAuth, postController.deletePost);

module.exports = router;