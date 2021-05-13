import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Nate',
        email: 'gingermint@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jae',
        email: 'jae@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Machi',
        email: 'Machi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Cambi',
        email: 'Cambi@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Bijou',
        email: 'Bijou@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users