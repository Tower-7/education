<template>
	<view class="picker">
		<view class="uni-title uni-common-pl">家教经验</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{experienceTime}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import num from '../../common/num.json'
	export default {
	    data() {
	        const currentDate = this.getDate({
	            format: true
	        })
			let experienceTime = this.$store.state.user.userInfo.experienceTime
	        return {
	            title: 'picker',
	            array: num,
	            index: 0,
	            date: currentDate,
	            time: '12:01',
				value:'',
				experienceTime: experienceTime
	        }
	    },
	    computed: {
	        startDate() {
	            return this.getDate('start');
	        },
	        endDate() {
	            return this.getDate('end');
	        }
	    },
	    methods: {
	        bindPickerChange: function(e) {
	            this.index = e.target.value
				this.experienceTime = this.array[this.index]
				this.$emit('changeValue',this.array[this.index]);
	        },
	        bindDateChange: function(e) {
	            this.date = e.target.value
	        },
	        bindTimeChange: function(e) {
	            this.time = e.target.value
	        },
	        getDate(type) {
	            const date = new Date();
	            let year = date.getFullYear();
	            let month = date.getMonth() + 1;
	            let day = date.getDate();
	
	            if (type === 'start') {
	                year = year - 60;
	            } else if (type === 'end') {
	                year = year + 2;
	            }
	            month = month > 9 ? month : '0' + month;;
	            day = day > 9 ? day : '0' + day;
	            return `${year}-${month}-${day}`;
	        }
	    }
	}
</script>

<style lang="scss" scoped>
	.picker{
		display: flex;
		width: 100vw;
		.uni-title{
			flex: 1;
		}
		.uni-list{
			flex: 3;
		}
	}
</style>
