import asyncHandler from 'express-async-handler'

//@desc Fetch all products
//@route GET /api/products
//@access Public
const setCart = asyncHandler  (async (req, res) => {
    req.session.cart = req.body
    res.status(201)
    res.send(req.session.cart)
})

const getCart = asyncHandler (async (req,res)=> {
    const cart = req.session.cart? req.session.cart : []
    res.send(cart)
})

export {setCart, getCart}