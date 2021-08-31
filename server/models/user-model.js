const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
},{
    timestamps: true
});

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;

//     const token = await jwt.sign({ _id: user._id.toString() }, jwtSecret);
//     // console.log(token);

//     user.tokens = user.tokens.concat({ token });
//     await user.save();
    
//     return token;
// };

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

// TODO 3:
// Change this method
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({email});

//     if(!user) {
//         throw new Error("Unnable to log in");
//     }

//     const match = await bcryptjs.compare(password, user.password);

//     if(!match) {
//         throw new Error("Unnable to log in");
//     }

//     return user;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;