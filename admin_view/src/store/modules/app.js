import { SET_COLLAPSE } from '../mutation-types'
import { apiApp } from '../../config/';
const state = {
    isCollapse: false
}
console.log(SET_COLLAPSE)
const mutations = {
    setCollapse(state){
        state.isCollapse = !state.isCollapse
    }
}

const actions = {
    upload({ commit },o){
        return new Promise((resolve,reject)=>{
            apiApp.getToken().then((res)=>{
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
