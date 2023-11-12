import axios from "axios"
// ✨ implement axiosWithAuth

export default axiosWithAuth = () => {
    const token = localStorage.getItem('token')
    return axios.create({
        baseURL: 'http://localhost:9000/api',
        headers: {
            Authorization: token,
        },
    })
}

