<template>
	<view class="teacher">
		<view class="list">
			<view class="pic">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="content">
				<view class="">
					<text>小A同学</text>
				</view>
				<view class="">
					<text>万科城|5年级|数学</text>
				</view>
			</view>
			<view class="btn">
				<view class="">
					<button class="mini-btn" type="primary" size="mini">预约</button>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="pic">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="content">
				<view class="">
					<text>小z同学</text>
				</view>
				<view class="">
					<text>万科城|5年级|数学</text>
				</view>
			</view>
			<view class="btn">
				<view class="">
					<button class="mini-btn" type="primary" size="mini">预约</button>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="pic">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="content">
				<view class="">
					<text>小z同学</text>
				</view>
				<view class="">
					<text>万科城|5年级|数学</text>
				</view>
			</view>
			<view class="btn">
				<view class="">
					<button class="mini-btn" type="primary" size="mini">预约</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.teacher{
		padding: 20rpx;
	}
	.list{
		display: flex;
		padding: 20rpx;
		margin-top: 50rpx;
		border-radius: 15rpx;
		box-shadow:2px 2px 5px #888;
		.pic{
			flex: 1;
			image{
				width: 150rpx;
				height: 150rpx;
				vertical-align: middle;
			}
			
		}
		.content{
			flex: 1;
			vertical-align: middle;
			line-height: 60rpx;
			font-size: $uni-font-size-base;
		}
		.btn{
			flex: 1;
			text-align: center;
			vertical-align: middle;
			font-size: $uni-font-size-base;
		}
	}
	
</style>
