import { apiNews } from '../../config/';
const state = {
    news:{},
    newsList: []
}
const mutations ={
    newsList(state,o){
        state.newsList = o
    }
}

const actions = {
    news_submit({ },o){
        return new Promise((resolve,reject)=>{
            apiNews.news_submit(o).then(res=>{
                resolve(res)
            })
        })
    },
    news_list({ commit },o){
        return new Promise((resolve,reject)=>{
            apiNews.news_list(o).then(res=>{
                console.log(res);
                commit('newsList',res.data)
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
