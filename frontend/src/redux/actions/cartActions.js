import axios from 'axios'
import * as actionTypes from '../types/cartTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`) // get data from target product

    dispatch({
        type: actionTypes.CART_ADD_ITEM, //add product data 
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    await axios.post('/api/cart', getState().cart.cartItems)
    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //axios to api/cart
}

export const getFromCart = () => async (dispatch) => {
    try {

        dispatch({type: actionTypes.CART_GET_REQUEST}) //dispatch loading

        const {data} = await axios.get('/api/cart')

        dispatch({
            type: actionTypes.CART_GET_SUCCESS, //end loading, send payload
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.CART_GET_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.CART_REMOVE_ITEM,
        payload: id
    })

    await axios.post('/api/cart', getState().cart.cartItems)

    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}