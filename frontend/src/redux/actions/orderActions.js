import * as actionTypes from '../types/orderTypes'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post('/api/orders',order, config)

        dispatch({
            type: actionTypes.ORDER_CREATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: actionTypes.ORDER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//payment result from paypal
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.ORDER_PAY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: actionTypes.ORDER_PAY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUserOrders = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: actionTypes.ORDER_LIST_USER_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/orders', config)


        dispatch({
            type: actionTypes.ORDER_LIST_USER_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: actionTypes.ORDER_LIST_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}