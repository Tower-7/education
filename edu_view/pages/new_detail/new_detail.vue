<template>
	<view class="news_detail">
		<view class="title">
			{{news.title}}
		</view>
		<view class="tabs">
			<text class="author">官方发布</text>
			<text class="time">{{news.meta.updateAt | formatDate}}</text>
		</view>
		<view class="image-content">
			<image mode="widthFix" :src="news.cover"
				@error="imageError"></image>
		</view>
		<view class="content" v-html="news.content">
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import ttNavBar from '@/components/tt-nav-bar/tt-nav-bar.vue'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				news: state => state.news.newsDetail
			})
		},
		methods: {
			
		},
		filters:{
			formatDate: (value)=> {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return `${MM}月${d}日`;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news_detail {
		padding: 30rpx;
		.title{
			font-size: $uni-font-size-lg;
			margin-bottom: 20upx;
		}
		.tabs {
			margin-bottom: 40upx;
			font-size: $uni-font-size-base;
			color: #888;
			.author{
				margin-right: 10upx;
			}
		}
		
		image{
			width: 100%;
		}
		.content{
			font-size: $uni-font-size-base;
			line-height: 50rpx;
			color: #555;
		}
		
	}
</style>
