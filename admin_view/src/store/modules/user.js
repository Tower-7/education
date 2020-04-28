import { apiUser } from '../../config/';
import cookie from 'cookie_js'
let storage = window.localStorage;
const state = {
    user:{}
}
const mutations ={
    userInfo(state,o){
        state.user = o
        cookie.set('user',o)
    },
    setToken(state,o){
      storage.setItem("token",o);
    }
}

const actions = {
    sign_in({ commit },data){
        return new Promise((resolve,reject)=>{
            apiUser.sign_in(data).then(res=>{
                commit('userInfo',data)
                commit('setToken',res.token)
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
