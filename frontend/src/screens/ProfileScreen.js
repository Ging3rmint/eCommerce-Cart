import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../redux/actions/userActions'
import {listUserOrders} from '../redux/actions/orderActions'
import PageBanner from '../components/molecules/PageBanner/PageBanner'
import {USER_UPDATE_PROFILE_RESET} from '../redux/types/userTypes'

const ProfileScreen = ({history}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [message, setMessage] = useState(null)

    const userDetails = useSelector (state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector (state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector (state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderUserList = useSelector (state => state.orderUserList)
    const {loading:loadingOrders, error:errorOrders, orders} = orderUserList

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            if (!user.name || !user || success){
                dispatch ({type: USER_UPDATE_PROFILE_RESET}) //stop loop
                dispatch(getUserDetails('profile'))
                dispatch(listUserOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
                setCountry(user.shippingAddress.country)
                setPostalCode(user.shippingAddress.postalCode)
                setCity(user.shippingAddress.city)
                setAddress(user.shippingAddress.address)
            }
        }


    },[dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({id: user._id, name, email, shippingAddress: {password, country, address, city, postalCode}}))
        }
    }

    return <Row>
        <PageBanner title="PROFILE"/>
        <Col style={{marginTop: '20px'}} md = {3}>
            <h2 style={{textAlign: 'center'}}>Edit Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId= 'name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>
                <Form.Group style={{marginTop: '20px'}}  controlId= 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group  style={{marginTop: '20px'}}  controlId= 'confirmPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button style={{marginTop: '20px'}} type='submit' variant='primary'>Update</Button>
            </Form>
        </Col>
        <Col style={{marginTop: '20px'}}  md={9}>
            <h2 style={{textAlign: 'center'}}>My Orders</h2>
            {loadingOrders? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>: (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>Delivered</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key = {order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: "red"}} />
                                )}</td>
                                <td>{order.isDelievered? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: "red"}} />
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}
export default ProfileScreen

