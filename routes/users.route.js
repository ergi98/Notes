const router = require('express').Router()
const users = require('../controllers/user.controller')

router.route('/register').post(users.UsersController.registerUser)
router.route('/login').post(users.UsersController.login)
router.route('/logout').post(users.UsersController.logout)
router.route('/usernames').get(users.UsersController.getUsedNames)
router.route('/session').post(users.UsersController.getSession)
router.route('/change-password').post(users.UsersController.changePassword)
router.route('/notes').post(users.UsersController.getUserNotes)
router.route('/add-note').post(users.UsersController.addNote)
router.route('/update-note').post(users.UsersController.updateNote)
router.route('/delete-note').post(users.UsersController.deleteNote)

module.exports = router;