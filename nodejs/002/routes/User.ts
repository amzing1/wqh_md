import express from 'express'
import {
  forgetPassword,
  login,
  protect,
  redirectTo,
  resetPassword,
  signup,
  updatePassword
} from '../control/authController'
import {
  aliasOldest,
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
  patchUser
} from '../control/userController'

const router = express.Router()

router.route('/').get(protect, getUsers)
router.route('/the-three-oldest').get(aliasOldest, getUsers)
router.route('/userStats').get(getUserStats)
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forgetPassword').post(forgetPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/updateMe').post(protect, updatePassword)
router
  .route('/:id')
  .get(getUser)
  .patch(patchUser)
  .delete(protect, redirectTo('admin'), deleteUser)

export default router
