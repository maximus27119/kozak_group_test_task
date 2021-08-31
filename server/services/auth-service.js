const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
const jwtSecret = process.env.JWT_SECRET;

class AuthService {
    async registration({login, email, password}){
        const candidate = await User.findOne({
            $or: [{ login }, { email }]
        });

        if(candidate)
            throw ApiError.BadRequest(`Пользователь с таким логином/емейлом уже существует.`);
        
        const hashedPassword = await bcryptjs.hash(password, 8);

        const user = await new User({
            login,
            email,
            password: hashedPassword
        }).save();

        // const token = await user.generateAuthToken();
        const token = await jwt.sign({ _id: user._id.toString() }, jwtSecret);
        return {user, token};
    }

    async login(login, password){
        const user = await User.findOne({login});

        if(!user)
            throw ApiError.BadRequest('Пользователь с таким логином не найден');
        
        const isPassEquals = await bcryptjs.compare(password, user.password);
        
        if(!isPassEquals)
            throw ApiError.BadRequest('Неверный пароль');

        // const token = await user.generateAuthToken();
        const token = await jwt.sign({ _id: user._id.toString() }, jwtSecret);

        return {user, token}
    }
}

module.exports = new AuthService();