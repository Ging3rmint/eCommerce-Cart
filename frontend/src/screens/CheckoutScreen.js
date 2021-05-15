import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {updateUserProfile, getUserDetails} from '../redux/actions/userActions'

const CheckoutScreen = ({history}) => {
    const dispatch = useDispatch()
    const userDetails = useSelector (state => state.userDetails)
    const {user: {shippingAddress}} = userDetails

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {
        if (shippingAddress){
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }else{
            dispatch(getUserDetails('profile'))
        }

    },[shippingAddress, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({shippingAddress:{address, city, postalCode, country}}))
        dispatch(getUserDetails('profile'))
        history.push('/payment')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Confirm Shipping Address</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId= 'address'>
                <Form.Label>Address</Form.Label>
                <Form.Control required type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group style={{marginTop: '20px'}} controlId= 'postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' required placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </Form.Group>
            <Form.Group style={{marginTop: '20px'}} controlId= 'city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' required placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Form.Group style={{marginTop: '20px'}} controlId= 'country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' required placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)} />
            </Form.Group>

            <Button style={{marginTop: '20px', width: "100%"}}type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}

export default CheckoutScreen
