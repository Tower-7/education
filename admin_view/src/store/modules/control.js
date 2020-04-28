import { apiControl } from '../../config/';

const state = {
}
const mutations ={
    
}

const actions = {
    test({ commit },o){
        return new Promise((resolve,reject)=>{
            apiControl.test(o).then(res=>{
               resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
