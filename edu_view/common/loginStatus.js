module.exports = {
	login: async (_this)=>{
		return new Promise((resolve,reject)=>{
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					resolve(res)
			    },
				fail(err) {
					reject(err)
				}
			});
		})
		.then((res)=>{
			_this.$store.commit('updateUser',res.data)
		})
		.catch((err)=>{
			uni.showToast({
			    title: '请先登录',
				icon: 'none',
				position: 'bottom',
			    duration: 500
			});
			setTimeout(function(){
				uni.navigateTo({
					url: `../../pages/login/login?url=${_this.url}&urlId=${_this.urlId}`
				})
			},500)
			
		})
	},
	status: async (_this)=>{
		return new Promise((resolve,reject)=>{
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					resolve(res)
			    },
				fail(err) {
					reject(err)
				}
			});
		})
		.then((res)=>{
			uni.navigateTo({
				url: _this.url
			})
		})
		.catch((err)=>{
			uni.showToast({
			    title: '请先登录',
				icon: 'none',
				position: 'bottom',
			    duration: 500
			});
			setTimeout(function(){
				uni.navigateTo({
					url: `../../pages/login/login?url=${_this.url}&urlId=${_this.urlId}`
				})
			},500)
			
		})
	}
}