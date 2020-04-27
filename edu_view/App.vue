<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/iconfont.ttf') format('truetype');
	}
	
	.icon {
		font-family: iconfont;
		margin-right: 50upx;
	}
	.line {
		width: 100%;
		height: 1px;
		background-color: #eee;
	}
	.line_b{
		width: 100%;
		height: 15rpx;
		background-color: #e6ecf1;
	}
	uni-toast .uni-simple-toast__text{
		background-color: #1eb2a6;
	}
</style>
