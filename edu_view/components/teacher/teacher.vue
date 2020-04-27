<template>
	<view class="teacher">
		<view class="listWrap" v-for="(item,index) in userList" :key="index">
			<view class="list" @click="detail(item._id)">
				<view class="pic">
					<image :src="item.avatarUrl" mode=""></image>
				</view>
				<view class="content">
					<view class="l1">
						<text class="name">{{item.nickName}}</text>
						<text class="position">{{item.job}}</text>
						<text class="date">{{  item.lat | distance(item.lon,location.latitude,location.longitude)}}</text>
					</view>
					<view class="l2">
						<text>{{item.school}}</text>
					</view>
					<view class="l3">{{item.intro | maxLenghtFilter}}</view>
				</view>
			</view>
			<view class="line_b"></view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				teacher:[]
			}
		},
		computed:{
			...mapState({
				userList: state => state.user.userList,
				location: state => state.common.location
			}),
		},
		created() {
			this.getData()
		},
		mounted() {
		},
		methods: {
			getData(){
				let start = 0
				let num =20
				let data = {
					start: start,
					num: num
				}
				this.$store.dispatch('getUserList',data)
			},
			detail(id){
				this.$store.dispatch('getUserById',id).then((res)=>{
					uni.navigateTo({
						url: `../../pages/teacher_detail/teacher_detail`
					})
				})
				
			},
			
		},
		filters:{
			maxLenghtFilter:function(value){
				if(value){
					return value.substring(0,30) + '...'
				}
			},
			distance(lat1,lng1,lat2,lng2){
				if(!lat1){
					return ''
				}
				let EARTH_RADIUS = 6378137.0;
				let distance = EARTH_RADIUS * Math.acos(Math.cos(lat1*Math.PI/180) *Math.cos(lat2*Math.PI/180) *Math.cos( (lng1-lng2)*Math.PI/180 ) + Math.sin(lat1*Math.PI/180) * Math.sin(lat2*Math.PI/180))
				return `${(distance / 1000).toFixed(1)}km`
			}
		}
	}
</script>

<style scoped lang="scss">
	.teacher{
	}
	.list{
		display: flex;
		padding: 20rpx;
		margin-top: 20rpx;
		border-radius: 15rpx;
		font-size: $uni-font-size-base;
		.pic{
			flex: 1;
			text-align: center;
			image{
				width: 150rpx;
				height: 150rpx;
				vertical-align: middle;
			}
		}
		.content{
			flex: 2;
			vertical-align: middle;
			line-height: 60rpx;
		}
		.l1{
			display: flex;
			text {
				flex: 1;
			}
			.name{
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
			}
			.position{
				color: $uni-text-color-theme;
			}
			.date{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				text-align: right;
			}
		}
		.l3{
			line-height: 40rpx;
			color: $uni-text-color-placeholder;
		}
	}
	
</style>
