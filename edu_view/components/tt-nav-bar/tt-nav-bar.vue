<template>
	<!-- 设置/我的/主页 -->
	<view class="tt-navbar" :style="{backgroundColor:backgroundColor}">
		<tt-status-bar></tt-status-bar>
		<!-- #ifdef MP-WEIXIN -->
		<view :class=topHeight v-if="title.length"></view>
		<!-- #endif -->
		<view class="tt-nav-content" :style="{color:color}">
			<view class="tt-nav-left" @tap="onClickLeft">
				<view v-if="leftIcon.length">
					<!-- #ifdef MP-WEIXIN -->
					<text class="icon">&#xe65a;</text>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<text class="icon" v-html="leftIcon"></text>
					<!-- #endif -->
				</view>
			</view>
			<view class="title">
				<view class="tt-nav-title" v-if="title.length">
					<text class="uni-nav-bar-text">{{ title }}</text>
				</view>
				<!-- 标题插槽 -->
				<slot />
			</view>
			<view class="tt-nav-right" @tap="onClickRight">
				<view v-if="rightIcon.length">
					<text class="icon" v-html="rightIcon"></text>
				</view>
				<view v-if="rightText.length">
					<text class="tt-right-text">{{rightText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ttStatusBar from '../tt-status-bar/tt-status-bar.vue'
	export default {
		components:{
			ttStatusBar
		},
		data(){
			return{
				statusBarHeight:'',
			}
		},
		props:{
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			backgroundColor:{
				type:String,
				default:''
			},
			color:{
				type:String,
				default:''
			},
			topHeight:{
				type:String,
				default:''
			}
		},
		mounted() {
		},
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tt-navbar{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10;
	}
	.topHeight{
		width:100%;
		height:$tt-nav-height;
		background-color: #000;
	}
	.tt-nav-content{
		display: flex;
		width: 100%;
		height: $tt-nav-height;
		line-height: $tt-nav-height;
		font-size: $uni-font-size-lg;
		color: #fff;
		z-index: 10;
		view{
			flex:1;
		}
		.tt-nav-left{
			margin-left: 30rpx;
		}
		.tt-nav-title{
			text-align: center;
		}
		.tt-nav-right{
			text-align: right;
			.tt-right-text{
				margin-right: 30rpx;
				color: #1eb2a6;
			}
		}
		
	}
</style>