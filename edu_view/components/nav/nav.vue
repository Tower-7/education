<template>
	<view>
		<view class="nav">
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
			}
		},
		created() {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.nav{
		height: 41px;
		line-height: 41px;
		text-align: center;
		color: #fff;
		font-size: $uni-font-size-lg;
		background-color: $uni-color-status;
	}
</style>
