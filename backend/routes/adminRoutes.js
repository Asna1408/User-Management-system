 const express = require('express');
const router = express.Router()


const {adminLogin,registerAdmin,getUserData,userBlock,updateUser, addUser} = require('../controllers/adminController')
const {adminAuth} = require('../middleware/authMiddleware');


router.post('/register',registerAdmin)
router.post('/login',adminLogin)
router.get('/getUserData',adminAuth,getUserData)
router.post('/userBlock',userBlock)
router.post('/editUser',updateUser)
router.post('/addUser',addUser)


module.exports = router;