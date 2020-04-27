<template>
	<view class="content">
		<view class="tab">
			<Tab></Tab>
		</view>
	</view>
</template>

<script>
	import Tab from "../../components/tab/tab.vue"
	export default {
		components:{Tab},
		data() {
			return {}
		},
		onLoad() {
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
			        console.log(res.data);
			    }
			});
		},
		created() {
			this.getLocation()
		},
		methods: {
			login(){
				uni.navigateTo({
					url:'../../pagesC/login/login'
				})
			},
			getLocation(){
				let _this = this
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						_this.$store.commit('location',res)
				    }
				});
			}
		}
	}
</script>

<style>
	
</style>
