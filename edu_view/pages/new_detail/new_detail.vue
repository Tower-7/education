<template>
	<view class="news_detail">
		<view class="title">
			{{news.title}}
		</view>
		<view class="image-content">
			<image mode="widthFix" :src="news.cover"
				@error="imageError"></image>
		</view>
		<view class="conten" v-html="news.content">
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import ttNavBar from '@/components/tt-nav-bar/tt-nav-bar.vue'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				news: state => state.news.newsDetail
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
