import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc Add cart to mongo session
//@route POST /api/cart
//@access Public
const setCart = async (req, res) => {
    req.session.cart = req.body
    res.status(201)
    res.send(req.session.cart)
}

//@desc Fetch cart from mongo session
//@route GET /api/cart
//@access Public
const getCart = async (req,res)=> {
    const cart = req.session.cart? req.session.cart : []
    res.send(cart)
}



export {setCart, getCart}