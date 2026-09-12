import axios from "axios";

// localhost:8000/admin/show (Method=GET)

const api = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
});

export default api;

// axios.get("localhost:8000/admin/show")
// api.get('/admin/show')

// axios.post("localhost:8000/admin/add",formData)
// api.post('/admin/add',formData)
