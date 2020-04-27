<template>
	<view>
		<view class="wrap">
			<view class="logo">
				<image src="../../static/logo.png" mode="widthFix"></image>
			</view>
			<view class="">
				<button  open-type="getUserInfo" @getuserinfo="bindGetUserInfo" >微信登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { USER_INFO } from '@/store/mutation-types.js'
	export default {
		data() {
			return {
				rawData: '',
				origin_url: '',
				origin_id: '',
				userInfo: ''
			}
		},
		onLoad: function (option) {
			console.log(option)
			this.origin_url = option.url
			this.origin_id = option.urlId
		},
		methods: {
			bindGetUserInfo(e) {
				let _this = this
				// #ifndef H5
				if (e.detail.userInfo){
					wx.getUserInfo({
					  success: function(res) {
							_this.rawData = res.rawData
							_this.userInfo = res.userInfo
							_this.$store.commit(USER_INFO,_this.userInfo)
					  }
					})
					wx.login({
					  success (res) {
					    if (res.code) {
							let url = `${_this.$store.state.baseURL}/wechat/getOpenId/${res.code}`
							_this.$store.dispatch('getOpenId',url)
							.then((openid)=>{
								let data = _this.userInfo
								data.openid = openid
								return new Promise((resolve,reject)=>{
									_this.$store.dispatch('login',data).then((res)=>{
										resolve(res)
									})
								})
							})
							.then((res)=>{
								if(_this.origin_id === '0'){
									uni.navigateTo({
										url: _this.origin_url
									})
								}
								else{
									uni.switchTab({
										url: _this.origin_url
									})
								}
							})
					    } else {
					      console.log('登录失败！' + res.errMsg)
					    }
					  }
					})
				} else {
					console.log('用户拒绝授权')
					 //用户按了拒绝按钮
				}
				// #endif
				
			},
		}
	}
</script>

<style lang="scss" scope>
	.wrap{
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
		text-align: center;
	}
	.logo image{
		width: 150upx;
		margin-bottom: 180upx;
	}
	button {
		width: 90vw;
		font-size: $uni-font-size-base;
		color: #fff;
		background-color: rgb(30, 178, 166);
		border-radius: 0;
		line-height: 100upx;
	}
</style>
