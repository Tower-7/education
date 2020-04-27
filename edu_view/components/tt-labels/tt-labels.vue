<template>
	<view class="tt-labels">
		<view class="uni-mask" @click="close" v-show=mask></view>
		<view class="checkTitle" @click="checkBox">
			<text v-if="checked.length==0">{{course?course:'未选择'}}</text>
			<text v-for="(item,index) in checked" :key="index">{{item.value}}/</text>
		</view>
		<view class="checkBox" :style="{height:checkBoxHeight}">
			<checkbox-group class="uni-list" @change="checkboxChange">
				<label class="submit" @click="submit">
					<view class="title"></view>
					<view class="check">
						<text>完成</text>
					</view>
				</label>
				<view class="content">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in checkboxItems" :key="item.name">
						<view class="title">{{item.value}}</view>
						<view class="check">
							<checkbox :value="item.name" :checked="item.checked"></checkbox>
						</view>
					</label>
					<label>
						</solt>
					</label>
				</view>
			</checkbox-group>
		</view>
	</view>
	
</template>

<script>
	import className from '../../common/className.json'
	export default {
		data() {
			let course = this.$store.state.user.userInfo.course
			return {
				checkboxItems: className,
				checkBoxHeight: 0,
				checked:[],
				mask: false,
				course: course
			}
		},
		methods: {
			checkboxChange: function(e) {
				this.course = ''
				let checked = e.target.value
				let changed = {}
				this.checked = []
				this.checkboxItems.forEach((e)=>{
					if (checked.indexOf(e.name) !== -1) {
						changed[e.checked] = true
						this.checked.push(e)
						this.course += `${e.value}/`
					} else {
						changed[e.checked] = false
					}
				})
				this.$store.commit('updateCoures',this.course)
				this.$emit('chTextarea',true)
			},
			checkBox(){
				this.checkBoxHeight = '50vh'
				this.mask = true
				this.$emit('chTextarea',false)
			},
			close(){
				this.checkBoxHeight = 0
				this.mask = false
				this.$emit('chTextarea',true)
			},
			submit(){
				this.checkBoxHeight = 0
				this.mask = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-mask{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
	}
	.checkBox{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0;
		line-height: 120rpx;
		background-color: #fff;
		z-index: 1000;
		transition: height 0.2s;
		.submit{
			display: flex;
			padding: 0 40rpx;
			color: #1eb2a6;
			background-color: #e6ecf1;
			border-bottom: 1px solid #eee;
			.title{
				flex: 3;
			}
			.check{
				flex: 1;
				text-align: right;
			}
		}
		.content{
			overflow: scroll;
			height: 50vh;
			.uni-list-cell{
				display: flex;
				padding: 0 40rpx;
				border-bottom: 1px solid #eee;
				.title{
					flex: 3;
				}
				.check{
					flex: 1;
					text-align: right;
				}
			}
		}
		
	}
</style>
