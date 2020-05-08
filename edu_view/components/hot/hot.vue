<template>
	<view class="hot">
		<view class="date">
			<text>庚子鼠年&nbsp;{{ date | formatDate }}</text>
		</view>
		<view class="week">
			<text>{{week}}&nbsp;/&nbsp;爱学习</text>
			<view class="line-middle"></view>
		</view>
		<view class="line-h"></view>
		<view class="news" v-for="(item,index) in newsList" :key="index">
			<view class="user_info">
				<image class="avatar" src="../../static/logo.png" mode=""></image>
				<text>官方发布</text>
			</view>
			<view class="pic">
				<image :src="item.cover" mode=""></image>
			</view>
			<view class="title_info">
				<view class="title">
					<text>{{item.title | maxLenghtFilter}}</text>
				</view>
				<view class="intro">
					<text>我们不敢面对粗糙和衰老，以致无法</text>
				</view>
			</view>
			<view class="line-h"></view>
			<view class="set">
				<text class="icon">&#xe63e;</text>
				<text class="icon">&#xe657;</text>
				<text class="icon">&#xe636;</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				date: new Date(),
				week: '',
				newList: []
			}
		},
		computed:{
			...mapState({
				newsList: state => state.news.newsList,
			}),
		},
		mounted() {
			this.getInit()
		},
		methods: {
			getInit(){
				let now = new Date();
				let day = now.getDay();
				let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.week = weeks[day]
				uni.getSystemInfo({
				    success: (res)=> {
				        this.statusBarHeight = res.statusBarHeight + 'px'
						const query = uni.createSelectorQuery().in(this);
						query.select('.scroll-h').boundingClientRect(data => {
						}).exec();
						
				    }
				});
				let data ={
					start: 0,
					num: 20,
				}
				let _this = this
				this.$store.dispatch('getNewsList',data).then(res=>{
					// _this.newsList = res
					// console.log(_this.newsList)
				})
			}
		},
		filters:{
			formatDate: (value)=> {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return `${y}-${MM}-${d}`;
			},
			maxLenghtFilter:function(value){
				if(value){
					return value.substring(0,20) + '...'
				}
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.scroll-h {
	    width: 750rpx;
	    flex-direction: row;
		padding-top: 20rpx;
		background-color: #000;
		color: #fff;
	    white-space: nowrap;
	    /* flex-wrap: nowrap; */
	    /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}
	.line-h {
	    height: 1rpx;
	    background-color: #eee;
	}
	.line-h-b {
	    height: 20rpx;
	    background-color: #e6ecf1;
	}
	
	.uni-tab-item {
	    display: inline-block;
	    flex-wrap: nowrap;
	    padding-left: 34rpx;
	    padding-right: 34rpx;
		border-bottom: 2px solid #000;
	}
	.uni-tab-item-active {
		border-bottom: 2px solid #1eb2a6;
	}
	.uni-tab-item-title {
	    font-size: 30rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    /* #ifndef APP-PLUS */
	    white-space: nowrap;
	    /* #endif */
	}
	.uni-tab-item-title-active {
	    color: #1eb2a6;
	}
	.date{
		text-align: center;
		font-size: 50upx;
		line-height: 80upx;
	}
	.week{
		text-align: center;
		font-size: $uni-font-size-base;
		margin-bottom: 10upx;
		text{
			background-color: #FFFFFF;
			padding: 0 20upx;
		}
		.line-middle{
			position: relative;
			top: -20upx;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
			height: 2upx;
			background-color: #000000;
			z-index: -1;
		}
	}
	.news{
		padding: 20upx;
		.user_info{
			line-height: 70upx;
			.avatar{
				width: 50upx;
				height: 50upx;
				vertical-align: middle;
				margin-right: 8upx;
			}
			text{
				font-size: $uni-font-size-base;
			}
		}
		.pic{
			image{
				width: 100%;
			}
		}
		.title_info{
			margin-bottom: 30upx;
			.title{
				font-size: $uni-font-size-lg;
				line-height: 70upx;
			}
			.intro{
				font-size: $uni-font-size-sm;
				color: #aaa;
			}
		}
		.set{
			margin-top: 30upx;
		}
	}
	
</style>
