const express = require('express');
const router = express.Router();

const {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
} = require('../MiddleWare');

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  ToggleLike,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  GenerateDescription,
  GenerateKeywords,
  GenerateTags,
  GenerateMinutesToRead,
  FetchLatesBlogs,
} = require('../controllers/BlogController');
const RolesEnum = require('../Constants/Roles');

router.get('/', getAllBlogs);
router.get('/latest-blogs', FetchLatesBlogs);
router.get('/:slug', getSingleBlog);
router.post(
  '/',
  IsItAuthenticatedMiddleware,
  // AuthorizePermissionsMiddleware(RolesEnum.ADMIN),
  createBlog
);
router.patch('/:slug', IsItAuthenticatedMiddleware, updateBlog);
router.delete('/:slug', IsItAuthenticatedMiddleware, deleteBlog);
router.post('/:blogId/likes', IsItAuthenticatedMiddleware, ToggleLike);

router.get('/:blogId/comments', getAllComments);
router.post('/:blogId/comments', IsItAuthenticatedMiddleware, createComment);
router.put(
  '/:blogId/comments/:commentId',
  IsItAuthenticatedMiddleware,
  updateComment
);
router.delete(
  '/:blogId/comments/:commentId',
  IsItAuthenticatedMiddleware,
  deleteComment
);

router.post('/generate-description', GenerateDescription);
router.post('/generate-keywords', GenerateKeywords);
router.post('/generate-tags', GenerateTags);
router.post('/generate-minutes-to-read', GenerateMinutesToRead);

module.exports = router;
