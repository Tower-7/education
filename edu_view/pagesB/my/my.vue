<template>
	<view class="my">
		<view class="my-content">
			<tt-nav-bar :title="userInfo.nickName" :backgroundColor="backgroundColor"></tt-nav-bar>
			<view class="tt-nav-height" :style="{paddingTop:statusBarHeight}"></view>
			<view class="user_info">
				<view class="avatar">
					<image :src="userInfo.avatarUrl" mode="" @click="chAavatar(userInfo.avatarUrl)"></image>
				</view>
				<view class="text">
					<text>{{userInfo.signature}}</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="tab">
				<view class="">
					<text class="icon">&#xe742;</text>
					<text>收藏</text>
				</view>
				<view class="">
					<text class="icon">&#xe772;</text>
					<text>碎片</text>
				</view>
				<view class="" @click="setting">
					<text class="icon">&#xe636;</text>
					<text>提醒/退出</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="setting" @click="edittUserInfo">
				<view class="title">
					我的个人资料
				</view>
				<view class="edit">
					<view class="pic">
						<image :src="userInfo.avatarUrl" mode=""></image>
					</view>
					<view class="txt">
						<view class="">
							<text class="">编辑我的个人资料</text>
							<text class="space"></text>
							<text class="icon">&#xe63d;</text>
						</view>
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view class="content">
				<view class="title">
					我的学生
				</view>
				<Student></Student>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import ttNavBar from '../../components/tt-nav-bar/tt-nav-bar.vue'
	import Student from '../../components/student/student.vue'
	export default {
		components:{
			ttNavBar,
			Student
		},
		data() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight +'px'
			return {
				title: '',
				statusBarHeight: statusBarHeight,
				backgroundColor: 'transparent',
				openid: '',
				url: '../../pagesB/my/my',
				urlId: '1',
				avatar: [],
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		onShow(){
			// #ifdef MP-WEIXIN
			this.$loginStatus.login(this)
			// #endif
		},
		created() {
		},
		methods: {
			edittUserInfo(){
				if(this.userInfo.role == 1){
					uni.navigateTo({
						url:"../setting/setting"
					})
				}else{
					uni.navigateTo({
						url:"../setting/presetting"
					})
				}
			},
			chAavatar(avatar){
				let _this = this
				new Promise((resolve,reject)=>{
					uni.chooseImage({
					    count: 1, 
					    sizeType: ['compressed'],
					    sourceType: ['album'], 
					    success: function (res) {
							_this.$store.dispatch('upload',res.tempFilePaths[0])
							.then((res)=>{
								resolve(res)
							})
					    }
					});
				}).then((res)=>{
					_this.userInfo.avatarUrl = res
					return new Promise((resolve,reject)=>{
						_this.$store.dispatch('updateUser',_this.userInfo)
					})
				}).then((res)=>{
					uni.showToast({
					    title: res.data.msg,
						icon: 'none',
						position: 'bottom',
					    duration: 600
					});
				})
				
			},
			setting(){
				let _this = this
				uni.removeStorage({
				    key: 'userInfo',
				    success: function (res) {
				        console.log('退出成功');
						uni.navigateTo({
							url: `../../pages/login/login?url=${_this.url}`
						})
				    }
				});
			}
		},
		onPageScroll(option){
			if(option.scrollTop >2){
				this.backgroundColor = 'rgba(0,0,0, 0.5)'
			}
			else{
				this.backgroundColor = 'transparent'
			}
		}
	}
</script>

<style lang="scss">
	.my{
		color: #555;
	}
	.tt-nav-height{
		height: $tt-nav-height;
		background-color: #000000;
	}
	.user_info{
		position: relative;
		display: flex;
		width: 100%;
		.avatar{
			position: relative;
			top: -25rpx;
			left: 10%;
			width: 200rpx;
			height: 200rpx;
			border-radius: 200rpx;
			background-color: #fff;
			text-align: center;
			image{
				margin-top: 25rpx;
				width: 150rpx;
				height: 150rpx;
				border-radius: 150rpx;
			}
		}
		.text{
			position: absolute;
			left: calc( 10% + 220rpx);
			top: 50%;
			padding-right: 20rpx;
			transform: translateY(-50%);
			font-size: $uni-font-size-lg;
			color: #555;
		}
		
	}
	.line{
		width: 100%;
		height: 15rpx;
		background-color: #e6ecf1;
	}
	.tab{
		display: flex;
		font-size: $uni-font-size-lg;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		margin: 40rpx;
		view{
			flex: 1;
			
			.icon{
				font-size: 50rpx;
				margin-right: 20rpx;
				vertical-align: middle;
			}
		}
		view:nth-child(1),view:nth-child(2){
			border-right: 1px solid #ccc;
		}
	}
	.content .title{
		padding: 20rpx;
		margin-bottom: -50rpx;
		font-size: $uni-font-size-lg;
	}
	.setting{
		.title{
			padding: 20rpx;
			font-size: $uni-font-size-lg;
		}
		.edit{
			display: flex;
			margin: 20rpx auto;
			line-height: 50px;
			text-align: center;
			.pic{
				flex: 1;
				image {
					width: 50px;
					height: 50px;
					border-radius: 50px;
				}
				
			}
			.txt{
				flex: 4;
				view{
					display: inline;
					font-size: $uni-font-size-base;
					color: #fff;
					padding: 20rpx 40rpx;
					background-color: #1eb2a6;
					border-radius: 40rpx;
					text{
						display: inline-block;
						text-align: left;
					}
					.space{display: inline-block;width: 50rpx;}
					.icon{
						display: inline-block;
						text-align: right;
					}
				}
				
			}
			
		}
	}
</style>
