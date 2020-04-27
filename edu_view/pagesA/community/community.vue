<template>
	<view class="community">
		<view class="warp">
			<view class="list" 
			v-for="(item,index) in llist" 
			:key=index 
			:id="'l'+index"
			>
				<view>
					<image class="pic" 
					:class="item.text?'':'boder_radius'"
					:src="item.pic?item.pic:'../../static/home/2.jpg'" 
					:data-src="item.pic" 
					mode="widthFix" 
					@load="onImgLoad('l',index,item.pic)" 
					v-show="item.pic"></image>
				</view>
				<view class="text" v-show="item.text">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="warp">
			<view class="list" 
			v-for="(item,index) in rlist" 
			:key=index 
			:id="'r'+index"
			>
				<view>
					<image class="pic" 
					:class="boder_radius"
					:src="item.pic?item.pic:'../../static/home/2.jpg'" 
					:data-src="item.pic" 
					mode="widthFix"
					 @load="onImgLoad('r',index,item.pic)" 
					 v-show="item.pic"></image>
				</view>
				<view class="text">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="addCom" @click="addCom">
			<text class="icon">&#xe649;</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				essay:'',
				llist:[],
				rlist:[],
				ltop: 0,
				rtop: 0,
				url: '/pagesA/article/article',
				urlId: '0',
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData(){
				let start = 0
				let num =20
				
				let data = {
					start: start,
					num: num
				}
				let _this = this
				this.$store.dispatch('getEssayList',{data})
				.then((res)=>{
					this.essay = this.$store.state.essay.list
					this.llist.push(this.essay[0])
					this.essay.shift()
				})
			},
			onImgLoad(flag,i,pic){
				if(!this.essay.length){
					return
				}
				let id = `#${flag}${i}`
				const query = uni.createSelectorQuery().in(this);
				query.select(id).boundingClientRect(data => {
					if(flag === 'l'){
						this.ltop += data.height
					}
					else{
						this.rtop += data.height
					}
					if(this.ltop > this.rtop){
						this.rlist.push(this.essay[0])
					}
					else{
						this.llist.push(this.essay[0])
					}
					this.essay.shift()
				}).exec();
			},
			onPullDownRefresh() {
				this.essay = []
				this.rlist = []
				this.llist = []
				setTimeout( ()=> {
					
					uni.stopPullDownRefresh();
				}, 1000);
				this.getData()
			},
			addCom(){
				// #ifdef MP-WEIXIN
				this.$loginStatus.status(this,this.url)
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f5f7;
	}
	.community{
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		overflow: hidden;
		padding: 20rpx;
	}
	.warp{
		display: flex;
		flex-direction: column;
		flex-basis: 50%;
	}
	.list{
		position: relative;
		width: 95%;
		margin: 2.5%;
		border-radius: 15rpx;
		font-size: $uni-font-size-base;
		color: #555;
		background-color: #fff;
		.pic{
			width: 100%;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
		}
		.boder_radius{
			border-radius: 15rpx;
		}
		.text{
			padding: 20rpx;
		}
	}
	.addCom{
		position: fixed;
		right: 50rpx;
		bottom: 150rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		background-color: #1eb2a6;
		line-height: 100rpx;
		.icon{
			margin-left: 25rpx;
			color: #fff;
			font-size: 50rpx;
		}
	}
</style>
