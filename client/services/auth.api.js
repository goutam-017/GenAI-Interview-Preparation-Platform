import axios from "axios"
import config from '../config/config.js'


const api = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: true
})

export const register = async ({ fullname, email, password }) => {
    try {
        const { data } = await api.post('/api/auth/register', { fullname, email, password })
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}


export const login = async ({ email, password }) => {
    try {
        const { data } = await api.post(`/api/auth/login`, { email, password })
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const logout = async () => {
    try {
        const { data } = await api.get(`/api/auth/logout`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}

export const getMe = async () => {
    try {
        const { data } = await api.get(`/api/auth/get-me`)
        return data
    } catch (error) {
        console.log(error)
        return error.response?.data || { success: false, message: "Unable to connect to the server." }
    }
}