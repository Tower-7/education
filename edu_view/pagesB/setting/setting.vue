<template>
	<view class="setting">
		<tt-nav-bar
		left-icon="&#xe65a;" 
		right-text="确定"
		top-height="topHeight"
		:backgroundColor="backgroundColor"
		:title="title"
		:color="color"
		@clickLeft="back"
		@clickRight="submit"
		>
		</tt-nav-bar>
		<!-- #ifdef MP-WEIXIN -->
		<view class="nav-bar-height" :style="{paddingTop:statusBarHeight}"></view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view :style="{paddingTop:statusBarHeight}"></view>
		<!-- #endif -->
		<view class="">
			<view class="title">
				个人信息设置
			</view>
			<view class="content">
				<view class="list">
					<text class="t1">昵称</text>
					<input class="t2" type="text" v-model="info.nickName" placeholder="请填写你的昵称" />
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">手机号</text>
					<input class="t2" type="text" v-model="info.phone" placeholder="请填写你的手机号" />
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">所在地点</text>
					<text class="t2" @click="map()">{{info.addr?info.addr:'请选择居住地址'}}</text>
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">个性签名</text>
					<input class="t2" type="text" v-model="info.signature" placeholder="请填写你的个性签名" />
				</view>
			</view>
		</view>
		<view class="">
			<view class="title">
				个人资质
			</view>
			<view class="content">
				<view class="list">
					<tt-picker @changeValue="changeValue"></tt-picker>
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">职业</text>
					<input class="t2" type="text" v-model="info.job" placeholder="请填你的职业" />
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">就读学校</text>
					<input class="t2" type="text" v-model="info.school" placeholder="请填写就读/毕业院校" />
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">专业</text>
					<input class="t2" type="text" v-model="info.profession" placeholder="请填写你的专业" />
				</view>
				<view class="line"></view>
				<view class="list">
					<text class="t1">可授科目</text>
					<ttLabels class="t2" @chTextarea="chTextarea"></ttLabels>
				</view>
			</view>
		</view>
		<view class="">
			<view class="title">
				个人相册
			</view>
			<view class="">
				<Photo @getPhoto="getPhoto" :imageList="info.photo"></Photo>
			</view>
		</view>
		<view class="">
			<view class="title">
				教学经验
			</view>
			<view class="content" :style="{display:texarea?'block':'none'}">
				<textarea value="" v-model="info.experience" placeholder="两年寒暑假教学经验,教过的学生从班级倒数迅速排名中上游..." />
			</view>
		</view>
		<view class="">
			<view class="title">
				个人简介
			</view>
			<view class="content" :style="{display:texarea?'block':'none'}">
				<textarea value="" v-model="info.intro" placeholder="英语是我的强项,也特别擅长将自己的学习技巧交给别人..." />
			</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	import ttNavBar from '@/components/tt-nav-bar/tt-nav-bar.vue'
	import ttPicker from '@/components/tt-picker/tt-picker.vue'
	import ttLabels from '@/components/tt-labels/tt-labels.vue'
	import Photo from '../../components/photo/photo.vue'
	export default {
		components:{ttNavBar,ttPicker,ttLabels,Photo},
		data() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight +'px'
			let info = this.$store.state.user.userInfo
			return {
				statusBarHeight: statusBarHeight,
				checkBoxHeight: 0,
				backgroundColor:'#fff',
				title: '编辑个人资料',
				color: '#000',
				addr:'',
				info: info,
				texarea: true,
			}
		},
		created(){
			this.init()
		},
		methods: {
			init(){
				wx.getSetting({
				  success(res) {
				    if (!res.authSetting['scope.writePhotosAlbum']) {
				      wx.authorize({
				        scope: 'scope.writePhotosAlbum',
				        success () {
				          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
				          // wx.startRecord()
				        }
				      })
				    }
				  }
				})
			},
			map(){
				let _this = this
				new Promise((resolve,reject)=>{
					uni.chooseLocation({
					    success: function (res) {
								resolve(res)
					    }
					})
				}).then((res)=>{
					_this.info.addr = _this.addr = res.address
					_this.info.lat = res.latitude
					_this.info.lon = res.longitude
				})
				
			},
			back(){
				uni.navigateBack()
			},
			changeValue(data){
				this.info.experienceTime = data
			},
			chTextarea(data){
				this.texarea = data
			},
			getPhoto(data){
				let _this = this
				data.forEach(e=>{
					_this.$store.dispatch('upload',e)
					.then((res)=>{
						_this.info.photo.push(res)
					})
				})
			},
			submit(){
				this.info.course = this.$store.state.user.userInfo.course
				let userInfo = this.info
				let data = userInfo
				this.$store.dispatch('updateUser',data)
				.then((res)=>{
					uni.showToast({
					    title: res.data.msg,
						icon: 'none',
						position: 'bottom',
					    duration: 600
					});
					setTimeout(function(){
						uni.switchTab({
							url: `../../pagesB/my/my`
						})
					},600)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.setting{
		height: 100vh;
		padding-top: 40rpx;
		background-color: #e6ecf1;
		color: $uni-text-color;
	}
	.nav-bar-height {
		height: $tt-nav-height;
	}
	.title{
		padding: 0 40rpx;
		font-size: $uni-font-size-base;
		line-height: 70rpx;
		background-color: #e6ecf1;
	}
	.content{
		padding: 0 40rpx;
		line-height: 80rpx;
		font-size: $uni-font-size-lg;
		background-color: #FFFFFF;
		color:grey;
		.list {
			display: flex;
			.t1{
				flex:1;
			}
			.t2{
				flex: 3;
				min-height: 80rpx;
				line-height: 80rpx;
			}
		}
		textarea{
			padding: 20rpx;
			font-size: $uni-font-size-lg;
		}
	}
	.footer{
		width: 100%;
		height: 40rpx;
		background-color: #e6ecf1;
	}
</style>
