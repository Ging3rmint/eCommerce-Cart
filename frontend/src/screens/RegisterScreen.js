import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../redux/actions/userActions'

const RegisterScreen = ({location, history}) => {
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

    const userRegister = useSelector (state => state.userRegister)
    const {loading, error, userInfo} = userRegister
    const redirect = location.search? location.search.split('=')[1] : '/'

    useEffect(()=> {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            const shippingAddress = {
                country,
                postalCode,
                city,
                address
            }
            dispatch(register(name, email, password, shippingAddress))
        }
    }

    return <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId= 'name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group  style={{marginTop: '20px'}} controlId= 'email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group  style={{marginTop: '20px'}} controlId= 'address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group  style={{marginTop: '20px'}} controlId= 'postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>
                <Form.Group  style={{marginTop: '20px'}} controlId= 'city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control required type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
                <Form.Group  style={{marginTop: '20px'}} controlId= 'country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control required type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>
            <Form.Group  style={{marginTop: '20px'}} controlId= 'password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group  style={{marginTop: '20px'}} controlId= 'confirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button style={{marginTop: '20px'}} type='submit' variant='primary'>Register</Button>
        </Form>
        <Row className="py-3">
            <Col>Have an account? <Link to='/login'>Login</Link></Col>
        </Row>
    </FormContainer>
}
export default RegisterScreen
