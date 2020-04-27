<template>
	<view class="statusBar" :style="{ height: statusBarHeight }">
		<slot />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: ''
			}
		},
		created(){
			this.getInit()
		},
		methods: {
			getInit(){
				uni.getSystemInfo({
				    success: (res)=> {
						this.statusBarHeight = res.statusBarHeight + 'px'
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.statusBar{
		color: $uni-color-status;
		background-color: #000;
	}
</style>
