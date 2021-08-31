const AuthService = require('../services/auth-service');
const validator = require('validator');
const ApiError = require('../exceptions/api-error');

class AuthController {
    async registration(req, res, next){
        try{
            const {login, email, password} = req.body;

            if(!email || !validator.isEmail(email) || validator.isEmpty(email))
                throw ApiError.BadRequest('Не верный email.')
            
            if(!login || validator.isEmpty(login))
                throw ApiError.BadRequest('Не верный логин.')
            
            if(!password || password.length < 6)
                throw ApiError.BadRequest('Пароль должен иметь 6 или больше символов.')
            
            const userData = {
                login,
                email, 
                password
            };

            const result = await AuthService.registration(userData);

            res.cookie('token', result.token, { maxAge: 1000 * 60 * 60 * 24 * 7 });

            res.status(201).send(result);
        }catch(e){
            next(e);
        }
    };
    
    async login(req, res, next){
        try{
            const {login, password} = req.body;
            
            if(!login || validator.isEmpty(login))
                throw ApiError.BadRequest('Не верный логин.')
            
            if(!password || password.length < 6)
                throw ApiError.BadRequest('Пароль должен иметь 6 или больше символов.')

            const result = await AuthService.login(login, password);

            res.cookie('token', result.token, { maxAge: 1000 * 60 * 60 * 24 * 7 });

            res.status(201).send(result);
        }catch(e){
            next(e);
        }
    };
}

module.exports = new AuthController();