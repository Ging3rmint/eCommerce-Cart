import React, {useState, useEffect} from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../redux/actions/orderActions'
import {getUserDetails} from '../redux/actions/userActions'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.userDetails.user)
    const {shippingAddress} = user
    
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => { //handle undefined address detail on refresh
        if (user && shippingAddress){
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }else{
            dispatch(getUserDetails('profile'))
        }

    },[shippingAddress, dispatch, user])

    const gstAmt = 7

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = 0
    cart.taxPrice = addDecimals(Number(((gstAmt/100) * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(()=> {
        if (success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[success, history])


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    
    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {address}, {city} {' '} {postalCode}, {country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0? <Message>Your cart is empty</Message> : (
                            <ListGroup variant = 'flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping (Free)</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>GST {gstAmt}%</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {error&& <ListGroup.Item> <Message variant='danger'>{error}</Message> </ListGroup.Item>}
                        <ListGroup.Item>
                            <Button style={{width: "100%"}} type='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>
                                    Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default PlaceOrderScreen
