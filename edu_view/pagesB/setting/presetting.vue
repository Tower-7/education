<template>
	<view class="chrole">
		<tt-nav-bar
		left-icon="&#xe65a;" 
		top-height="topHeight"
		:backgroundColor="backgroundColor"
		:title="title"
		:color="color"
		@clickLeft="back"
		@clickRight="submit"
		>
		</tt-nav-bar>
		<view class="chrole-content">
			<view class="title">
				请选择您的身份
			</view>
			<view class="teacher" @click="chrole(1)">
				我是老师
			</view>
			<view class="student" @click="chrole(2)">
				我是家长/学生
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data(){
			return{
				backgroundColor:'#000',
			}
		},
		created() {
			
		},
		computed:{
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			chrole(role){
				this.confirm().then(()=>{
					let userInfo = this.userInfo
					if(userInfo.role){
						uni.showToast({
						    title: '身份不允许更改',
							icon: 'none',
							position: 'bottom',
						    duration: 500
						});
						return
					}
					userInfo.role = role
					this.$store.dispatch('updateUser',userInfo).then(()=>{
						if(role == 1){
							uni.navigateTo({
								url: `../setting/setting`
							})
						}
						else{
							uni.showToast({
							    title: '暂未开通',
								icon: 'none',
								position: 'bottom',
							    duration: 500
							});
						}
					})
				})
			},
			confirm(){
				return new Promise((resolve,reject)=>{
					uni.showModal({
					    title: '提示',
					    content: '身份选定后不能更改',
					    success: function (res) {
					        if (res.confirm) {
					            resolve()
					        } else if (res.cancel) {
					            return
					        }
					    }
					});
				})
			},
				
		}
	}
</script>

<style lang="scss" scoped>
	.chrole-content {
		position: fixed;
		top: 35%;
		left: 50%;
		width: 95%;
		transform: translate(-50%,-50%);
		text-align: center;
		.title{
			margin-bottom: 160upx;
		}
		.teacher,.student{
			color: #fff;
			background-color: #1EB2A6;
			margin-top: 80upx;
			line-height: 100upx;
		}
	}
</style>
