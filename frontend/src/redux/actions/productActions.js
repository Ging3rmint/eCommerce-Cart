import * as actionTypes from '../types/productTypes'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: actionTypes.PRODUCT_LIST_REQUEST})
        
        const {data} = await axios.get('/api/products')
        
        dispatch({//send data to reducer, reducer save into global state
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.PRODUCT_DETAILS_REQUEST})
        
        const {data} = await axios.get(`/api/products/${id}`)
        
        dispatch({//send data to reducer, reducer save into global state
            type: actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}