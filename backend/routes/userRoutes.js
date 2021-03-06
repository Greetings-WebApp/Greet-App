const express = require('express')
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')
// const { ensureAuth } = require('./../middleware/auth')

const router = express.Router()

// Authentication and Authourization
router.post('/register', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.protect, authController.logout)
router.patch('/updateMe',authController.protect, userController.upload.single('photo'), userController.updateMe)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword', authController.resetPassword)
router.get('/getUser', authController.protect, userController.getUser)
router.get('/getFriends', authController.protect, userController.getFriends)


// User Routes
// Only accessed by admin
// router.use(authController.protect)
// router.use(ensureAuth);
// router.route('/').get(userController.getAllUsers)
// router.route('/:id').get(userController.getUser).delete(userController.deleteUser)

module.exports = router
