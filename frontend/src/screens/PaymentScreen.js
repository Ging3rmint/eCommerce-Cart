import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../redux/actions/cartActions'

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    // useEffect(() => {
    //     setAddress(shippingAddress.address)
    //     setCity(shippingAddress.city)
    //     setPostalCode(shippingAddress.postalCode)
    //     setCountry(shippingAddress.country)
    // },[shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group style={{margin: '50px'}}>
                <Form.Label style={{marginBottom: '20px'}} as='legend'>Select Method</Form.Label>
                <Col >
                    <Form.Check type='radio' label='Paypal or Credit Card' id='Paypal' name='paymentMethod' value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}/>
                </Col>
            </Form.Group>

            <Button style={{marginTop: "50px", width: '100%'}} type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
}

export default PaymentScreen
