import { apiUser } from '../../config/';
import { setToken } from '@/utils/userStorage.js'
const state = {
    user:{}
}
const mutations ={
    userInfo(state,o){
        state.user = o
    }
}

const actions = {
    sign_in({ commit },data){
        return new Promise((resolve,reject)=>{
            apiUser.sign_in(data).then(res=>{
                commit('userInfo',data)
                setToken(res.token)
                resolve(res)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
