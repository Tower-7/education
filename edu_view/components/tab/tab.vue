<template>
	<view class="tabs">
		<tt-status-bar></tt-status-bar>
		<scroll-view id="tab-bar" 
		class="scroll-h" :scroll-x="true" 
		:show-scrollbar="false" 
		:scroll-into-view="scrollInto">
		    <view v-for="(tab,index) in tabBars" 
			:key="tab.id" class="uni-tab-item" 
			:class="tabIndex==index ? 'uni-tab-item-active':''" 
			:id="tab.id" :data-current="index" @click="ontabtap">
		        <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
		    </view>
		</scroll-view>
		<swiper class="swiper" :style="{height:listHeight}" @change="ontabchange" :current="current">
			<swiper-item class="list">
				<scroll-view scroll-y="true" :style="{height:listHeight}">
					<Hot></Hot>
				</scroll-view>
			</swiper-item>
			<swiper-item :height="listHeight">
				<scroll-view class="list" scroll-y="true" :style="{height:listHeight}">
					<Class></Class>
				</scroll-view>
			</swiper-item>
			<swiper-item class="list">
				<scroll-view scroll-y="true" :style="{height:listHeight}">
					<Teacher></Teacher>
				</scroll-view>
			</swiper-item>
			<swiper-item class="list">
				<scroll-view scroll-y="true" :style="{height:listHeight}">
					<Student></Student>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import ttStatusBar from "../../components/tt-status-bar/tt-status-bar"
	import Class from '../class/class.vue'
	import Hot from '../hot/hot.vue'
	import Teacher from '../teacher/teacher.vue'
	import Student from '../student/student.vue'
	export default {
		components:{
			ttStatusBar,
			Class,
			Hot,
			Teacher,
			Student
		},
		data() {
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
			return {
				statusBarHeight: statusBarHeight,
				date: new Date(),
				week: '',
				tabIndex: 0,
				scrollInto: "",
				listHeight: '',
				current: '',
				tabBars:[{
					name: '热点',
					id: 'hot',
				},{
					name: '文章',
					id: 'class'
				},{
					name: '家教',
					id: 'teacher'
				},
				{
					name: '学生',
					id: 'student'
				}]
				
			}
		},
		created() {
		},
		mounted() {
			this.getInit()
		},
		methods: {
			ontabtap(e){
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.current = index
				this.switchTab(index);
			},
			switchTab(index) {
			  
			    if (this.tabIndex === index) {
			        return;
			    }
			    this.tabIndex = index;
			},
			ontabchange(e){
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			getInit(){
				let now = new Date();
				let day = now.getDay();
				let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.week = weeks[day]
				uni.getSystemInfo({
				    success: (res)=> {
						const query = uni.createSelectorQuery().in(this);
						query.select('.scroll-h').boundingClientRect(data => {
						  this.listHeight  = res.windowHeight - data.height + 'px'
						}).exec();
						
				    }
				});
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
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/iconfont.ttf') format('truetype');
	}
	.icon {
		font-family: iconfont;
		margin-right: 50upx;
	}
	
	/* #ifndef APP-PLUS */
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	
	/* #endif */
	
	.tabs {
		position: fixed;
	    flex: 1;
		top: 0px;
	    flex-direction: column;
	    overflow: hidden;
	    /* #ifdef MP-ALIPAY || MP-BAIDU */
	    height: 100vh;
	    /* #endif */
	}
	.status {
		background-color: #000;
	}
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

