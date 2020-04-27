<template>
	<view>
		<view class="">
			<button type="default">login</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			this.login()
		},
		methods: {
			login(){
				wx.login({
				  success (res) {
				    if (res.code) {
				      //发起网络请求
				      wx.request({
				        url: 'https://test.com/onLogin',
				        data: {
				          code: res.code
				        }
				      })
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			}
		}
	}
</script>

<style>

</style>
