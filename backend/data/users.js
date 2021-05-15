import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        shippingAddress:{
            address: 'some place',
            city: 'very good city',
            postalCode: '000000',
            country: 'Singapore',
        }
    },
    {
        name: 'Nate',
        email: 'gingermint@example.com',
        password: bcrypt.hashSync('123456', 10),
        shippingAddress:{
            address: 'nice place',
            city: 'sweet city',
            postalCode: '000001',
            country: 'Singapore',
        }
    },
    {
        name: 'Jae',
        email: 'jae@example.com',
        password: bcrypt.hashSync('123456', 10),
        shippingAddress:{
            address: 'nice place',
            city: 'sweet city',
            postalCode: '000001',
            country: 'Singapore',
        }
    },
    {
        name: 'Machi',
        email: 'Machi@example.com',
        password: bcrypt.hashSync('123456', 10),
        shippingAddress:{
            address: 'nice place',
            city: 'sweet city',
            postalCode: '000001',
            country: 'Singapore',
        }
    },
    {
        name: 'Cambi',
        email: 'Cambi@example.com',
        password: bcrypt.hashSync('123456', 10),
        shippingAddress:{
            address: 'nice place',
            city: 'sweet city',
            postalCode: '000001',
            country: 'Singapore',
        }
    },
    {
        name: 'Bijou',
        email: 'Bijou@example.com',
        password: bcrypt.hashSync('123456', 10),
        shippingAddress:{
            address: 'nice place',
            city: 'sweet city',
            postalCode: '000001',
            country: 'Singapore',
        }
    }
]

export default users