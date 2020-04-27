<template>
	<view class="container">
		<!-- #ifdef APP-PLUS -->
		<tt-status-bar></tt-status-bar>
		<!-- #endif -->
		<uni-nav-bar 
		class="navBar"
		left-icon="&#xe65a;" 
		right-text="发表" 
		right-color="#1eb2a6" 
		title="碎片"
		@clickLeft="clickLeft"
		@clickRight="submit"
		:style="{'margin-top':statusBarHeight}"
		>
		</uni-nav-bar>
		<view class="content">
			<view class="text">
				<textarea placeholder="这一刻,我想说......" auto-height v-model="text" />
			</view>
		</view>
		<view class="add_pic" @click.stop="chooseImage">
			<view class="pic">
				<text class="icon">&#xe621;</text>
			</view>
			<view class="text">
				<text>点击添加图片</text>
				<tt-image ref="addImage" number="0" size="0" source="2" @tranImgList="getImgList"></tt-image>
			</view>
			<view class="preview">
				<image :src="image" :data-src="image" mode="widthFix" @click.stop="chooseImage"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import ttStatusBar from '../../components/tt-status-bar/tt-status-bar.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import ttImage from '@/components/tt-image/tt-image.vue'
	export default {
		components: {ttStatusBar,uniNavBar,ttImage},
		data() {
			return {
				id: '',
				userid:'',
				text:'',
				image: '',
				uploadFile:'',
				statusBarHeight: ''
			}
		},
		created() {
			this.getSystemInfo()
		},
		methods: {
			getSystemInfo(){
				uni.getSystemInfo({
				    success: (res)=> {
						this.statusBarHeight = res.statusBarHeight - 1 + 'px'
				    }
				});
			},
			clickLeft(){
				uni.navigateBack()
			},
			chooseImage(){
				this.$refs.addImage.chooseImage()
			},
			getImgList(data){
				let _this = this
				_this.$store.dispatch('upload',data[0])
				.then((res)=>{
					_this.image = _this.uploadFile = res
				})
			},
			submit(){
				let id = this.id
				let userid = this.userid
				let text = this.text
				let pic = this.uploadFile
				console.log(pic)
				let data = {
					id: id,
					text: text,
					pic: pic
				}
				let url
				// #ifdef H5
				url = `/api/m/essay_submit`
				// #endif
				// #ifndef H5
				url = `${this.GLOBAL.baseURL}/m/essay_submit`
				// #endif
				uni.request({
				    url: url,
					method: 'POST',
				    data: data,
				    success: (res) => {
						if(res.statusCode===200){
							uni.showToast({
							    title: res.data.msg,
								icon: 'none',
								position: 'bottom',
							    duration: 600
							});
							setTimeout(() => {
								uni.switchTab({
									url: "../../pagesA/community/community",
									success(){
									}
								});
							}, 600);
						}
				    },
					
				});
			}
		}
	}
</script>

<style lang="scss">
	.container{
		color: $uni-text-color;
		font-size: $uni-font-size-lg;
	}
	.add_pic{
		position: relative;
		width: 100%;
		padding: 100rpx 0;
		text-align: center;
		background-color: #EEEEEE;
		.pic{
			font-size: 100rpx;
		}
		.text{
			font-size: $uni-font-size-lg;
		}
	}
	.content{
		padding: 20rpx;
		margin-bottom: 20rpx;
		textarea{
			padding: 10rpx 20rpx;
		}
	}
	.preview{
		position: absolute;
		top: 0;
		width: 100%;
		image{
			width: 100%;
		}
	}
</style>
