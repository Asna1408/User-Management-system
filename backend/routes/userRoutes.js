const express = require('express');
const router = express.Router()
const {registerUser,loginUser,getMe, uploadProfile,

} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/me', protect,getMe)
// router.post('/upload',protect,uploadProfile)





module.exports = router;
