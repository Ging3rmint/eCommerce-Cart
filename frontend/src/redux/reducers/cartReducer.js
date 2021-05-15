import * as actionTypes from '../types/cartTypes'

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type){
        case actionTypes.CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem){
                // let qty = item.qty + existItem.qty;
                // if (qty > item.countInStock){
                //     qty = item.countInStock;
                // }
                // item.qty = qty;
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.CART_GET_REQUEST:
            return{
                loading: true,
                cartItems: []
            }
        case actionTypes.CART_GET_SUCCESS:
            return{
                loading: false,
                cartItems: action.payload
            }
        case actionTypes.CART_GET_FAIL:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case actionTypes.CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case actionTypes.CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}

