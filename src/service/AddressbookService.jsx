import axios from 'axios'

class AddressbookService{
    baseUrl ="http://localhost:8080/addressbookservice"

    addPerson(data) {
        return axios.post(`${this.baseUrl}/create`, data);
      }

    getAll() {
        return axios.get(`${this.baseUrl}/getall`);
      }

    getPersonById(personId) {
        return axios.get(`${this.baseUrl}/get/${personId}`);
      }

    updatePerson(personId,data) {
        return axios.put(`${this.baseUrl}/update/${personId}`, data);
      }


    delete(personId) {
        return axios.delete(`${this.baseUrl}/delete/${personId}`);
      }

    sortByCity() {
        return axios.get(`${this.baseUrl}/sortByCity`);
      }
    sortByState() {
        return axios.get(`${this.baseUrl}/sortByState`);
      }
}

export default new AddressbookService();