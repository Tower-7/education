import { USER_INFO,USER_LIST,USER_DETAIL } from '../mutation-types.js'
import { apiUser } from '@/config'

const state = {
   userInfo:{},
   userList: [],
   photoList: {},
   userDetail:{},
}
const mutations = {
	[USER_INFO](state,data){
		state.userInfo = data
		uni.removeStorage({
		    key: 'userInfo',
		    success: function (res) {
		    }
		});
		uni.setStorage({
		    key: 'userInfo',
		    data: data,
		    success: function (data) {
		        console.log('success');
		    }
		});
		
	},
	updateOpenid(state,res){
		state.userInfo.openid = res
		uni.setStorage({
		    key: 'userInfo',
		    data: state.userInfo,
		    success: function (data) {
		        // console.log(data);
		    }
		});
	},
	updateCoures(state,data){
		state.userInfo.course = data
		uni.setStorage({
		    key: 'userInfo',
		    data: state.userInfo,
		    success: function (data) {
		        // console.log(data);
		    }
		});
	},
	[USER_LIST](state,data){
		state.userList = data
	},
	[USER_DETAIL](state,o){
		state.userDetail = o
	}
		
}
const actions = {
	getOpenId({ state,commit },o){
		return new Promise((resolve, reject) => {
			 uni.request({
				url: o,
				method: 'GET',
				success: (res) => {
					let data = JSON.parse(res.data.data)
					resolve(data.openid)
				}
			 })
		})
	},
	login({commit},o){
		return new Promise((resolve,reject)=>{
			apiUser.login(o).then((res)=>{
				commit(USER_INFO,res.data[0])
				resolve(res)
			})
			
		})
	},
	updateUser({ commit },o){
			delete o.meta
			delete o.__v
			return new Promise((resolve,reject)=>{
				apiUser.update(o).then((res)=>{
					commit(USER_INFO,o)
					resolve(res)
				})
			})
		
	},
	getUserList({ commit },o){
		apiUser.getUserList(o).then((res)=>{
			commit(USER_LIST,res.data)
		})
	},
	getUserById({commit},o){
		console.log(o)
		apiUser.getUserById(o).then((res)=>{
			commit(USER_DETAIL,res)
		})
	}
}

export default {
    state,
    mutations,
	actions
}