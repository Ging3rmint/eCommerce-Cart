import path from 'path'
import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
// import connectDB from './config/db.js';
import colors from 'colors';

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

// connectDB()

const app = express()

// const MongoStore = connectMongo;

const clientP = mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(m => m.connection.getClient()).catch((error) => `Error: ${error.message}`)

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({clientPromise: clientP}),
    cookie: { maxAge: 180 * 60 * 1000} //3hrs expiry
}))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else{
    app.get('/', (req, res)=> {
        res.send('API Running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
