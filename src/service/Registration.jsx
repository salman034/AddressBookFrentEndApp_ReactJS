import axios from "axios"

class RegistrationService{
    baseUrl = "http://localhost:8080/addressbookservice"

    getAllUsers(){
        return axios.get(`${this.baseUrl}/getall`);
    }

    addUser(data){
        return axios.post(`${this.baseUrl}/user`, data);
    }

    updateUser(id, data){
        return axios.put(`${this.baseUrl}/update/${id}`, data);
    }

    deleteUser(id){
        return axios.delete(`${this.baseUrl}/delete/${id}`);
    }
}

export default new RegistrationService();