import axios from "axios";

class LoginService{
    baseUrl= 'http://localhost:8080/addressbookservice/login'

    checkLogin(data){
        return axios.post(`${this.baseUrl}`, data)
    }

}

export default new LoginService();