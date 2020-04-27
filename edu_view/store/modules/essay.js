import { ESSAY_LIST } from '../mutation-types.js'
import { apiEssay } from '../../config'

const state = {
   list:[]
}
const mutations = {
	[ESSAY_LIST](state,res){
		state.list = res.data.data
	}
}
const actions = {
	getEssayList({commit},o){
		return new Promise((resolve,reject)=>{
			apiEssay.getList(o).then((res)=>{
				commit(ESSAY_LIST,res)
				resolve(res)
			})
		})
	}
}

export default {
    state,
    mutations,
    actions,
}