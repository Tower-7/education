import axios from 'axios'
import { getToken } from "../utils/userStorage";

let baseURL = process.env.NODE_ENV==='development'?'/api/admin':'/admin'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})


instance.interceptors.request.use(function(config){
    return config
},function(err) {
    return Promise.reject(err)
})

instance.interceptors.response.use(function(response) {
    return response.data;
},function(err) {
    return Promise.reject(err)
})

const instanceAdmin = axios.create({
    headers: {
        'Authorization': getToken(),
    },
    baseURL: baseURL,
    timeout: 5000
})

instanceAdmin.interceptors.request.use(function(config){
    return config
},function(err) {
    return Promise.reject(err)
})

instanceAdmin.interceptors.response.use(function(res) {
    return res.data;
},function(err) {
    return Promise.reject(err)
})

export {
    instance,
    instanceAdmin
} 