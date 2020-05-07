import { apiNews } from '../../config/';
const state = {
    news:{}
}
const mutations ={
  
}

const actions = {
    news_submit({ },o){
        return new Promise((resolve,reject)=>{
            apiNews.news_submit(o).then(res=>{
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
