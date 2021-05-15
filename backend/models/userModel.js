import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    cartItems:{
        name: { type: String},
        qty: { type: Number},
        image: { type: String},
        price: { type: Number},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }
},{
    timestamps: true
})

//built in mongoose function
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) { //middleware from mongoose
    if (!this.isModified('password')){ //check if password been modified
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}) 

const User = mongoose.model('User', userSchema)

export default User