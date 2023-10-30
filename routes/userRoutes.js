const express = require('express');
const router = express.Router();
const {
  IsItAuthenticatedMiddleware,
  AuthorizePermissionsMiddleware,
} = require('../MiddleWare');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');

router
  .route('/')
  .get(
    IsItAuthenticatedMiddleware,
    AuthorizePermissionsMiddleware('admin'),
    getAllUsers
  );

router.route('/showMe').get(IsItAuthenticatedMiddleware, showCurrentUser);
router.route('/updateUser').patch(IsItAuthenticatedMiddleware, updateUser);
router
  .route('/updateUserPassword')
  .patch(IsItAuthenticatedMiddleware, updateUserPassword);

router.route('/:id').get(IsItAuthenticatedMiddleware, getSingleUser);

module.exports = router;
