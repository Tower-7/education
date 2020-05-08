import { NEWS_LIST,NEWS_DETAIL } from '../mutation-types.js'
import { apiNews } from '@/config'

const state = {
   newsList: [],
   newsDetail:{},
}
const mutations = {
	[NEWS_LIST](state,data){
		state.newsList = data
	},
	[NEWS_DETAIL](state,o){
		state.newsDetail = o
	}
		
}
const actions = {
	
	getNewsList({ commit },o){
		return new Promise((resolve,reject)=>{
			apiNews.getNewsList(o).then((res)=>{
				commit(NEWS_LIST,res.data)
				resolve(res.data)
			})
		})
		
	},
	getNewsById({commit},o){
		return new Promise((resolve,reject)=>{
			apiNews.getNewsById(o).then((res)=>{
				commit(NEWS_DETAIL,res)
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