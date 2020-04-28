import axios from 'axios'
let storage = window.localStorage;
let token = storage.getItem('token')
console.log(token)

let baseURL = process.env.NODE_ENV==='development'?'/api/admin':'/admin'
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

const instanceAdmin = axios.create({
    headers: {
        'Authorization': storage.getItem('token'),
    },
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

export {
    instance,
    instanceAdmin
} 