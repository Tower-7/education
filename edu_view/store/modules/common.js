import { COMMON_LOCATION } from '../mutation-types.js'
import { apiCommon } from '../../config'

const state = {
	location: ''
}

const mutations = {
	[COMMON_LOCATION](state,res){
		state.location = res.data
	},
	location(state,res){
		state.location = res
	}
}

const actions = {
	upload({ commit }, o){
		return new Promise((resolve,reject)=>{
			apiCommon.getToken().then((res)=>{
				resolve(res)
			})
		})
		.then((res)=>{
			return new Promise((resolve,reject)=>{
				apiCommon.upload(o,res.data.uploadToken).then((res)=>{
					resolve(res)
				}).catch((res)=>{
					console.log(res)
					let err = JSON.parse(res)
					uni.showToast({
					title: err,
					icon: 'none',
					position: 'top',
					   duration: 5000
					})
				})
			})
		})
	}
}

export default {
	state,
	mutations,
	actions
}