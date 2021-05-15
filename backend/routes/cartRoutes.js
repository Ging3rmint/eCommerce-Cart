import express from 'express'
const router = express.Router()
import {setCart, getCart} from '../controllers/cartController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(setCart).get(getCart)
router.route('/user').put(protect)

export default router