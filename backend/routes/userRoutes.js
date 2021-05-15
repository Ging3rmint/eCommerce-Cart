import express from 'express'
const router = express.Router()
import {authUser, registerUser, getUserProfile, updateUserProfile, updateUserShippingAddress, setUserSessionInfo, getUserSessionInfo} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/address').put(protect, updateUserShippingAddress)
router.route('/session').post(protect, setUserSessionInfo).get(protect, getUserSessionInfo)



export default router