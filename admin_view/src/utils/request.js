import axios from 'axios'
import { getToken } from "../utils/userStorage";
import router from "../router";
import { Message } from 'element-ui'

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
    // headers: {
    //     'Authorization': getToken(),
    // },
    baseURL: baseURL,
    timeout: 5000
})

instanceAdmin.interceptors.request.use(function(config){
    config.headers['Authorization'] = getToken()
    return config
},function(err) {
    return Promise.reject(err)
})

instanceAdmin.interceptors.response.use(function(res) {
    if(res.data.status==='4'){
        Message({
            showClose: true,
            message: res.data.msg,
            type: 'error',
            duration: 2000
        })
        setTimeout(() => {
            router.push({name:'login'})
        }, 3000);
        return res.data;
    }
    else{
        return res.data;
    }
},function(err) {
    return Promise.reject(err)
})

export {
    instance,
    instanceAdmin
} 