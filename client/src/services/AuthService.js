import $api from "../http";

export default class AuthService{
    static async login(login, password){
        return $api.post('/login', {login, password});
    }
    static async registration(login, email, password){
        return $api.post('/registration', {login, email, password});
    }
    static logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return;
    }
}