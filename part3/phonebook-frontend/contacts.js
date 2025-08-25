import axios from "axios";

const baseUrl = '/api/persons'

const create = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then(response => response.data)
}

const read = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const update = (contactId, newObject) => {
    const request = axios.put(`${baseUrl}/${contactId}`, newObject);
    return request.then(response => response.data)
}

const deleteContact = (contactId) => {
    return axios.delete(`${baseUrl}/${contactId}`)
}

export default { create, read, update, deleteContact }