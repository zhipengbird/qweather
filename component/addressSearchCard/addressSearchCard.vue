<template>
	<view>
		<view v-if="isShow" class="container background">
			<view class="scrollItem" v-for="(item,index) in cityList" :key="index" @click="citySelect(item)">
				{{item.adm1+' - '+item.adm2+' - '+item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			cityList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		},
		methods: {
			citySelect(city) {
				this.$emit('citySelected', city)

			}
		}
	}
</script>

<style lang="less">
	.container {
		// position: absolute;
		z-index: 999;
		// left: 0;
		// right: 0;
		overflow: auto;
		margin: 3%;
		display: flex;
		flex-direction: column;

		height: 500px;
		border-radius: 16px;
		// background: rgba(255, 255, 255, 0.81);


		.scrollItem {
			color: #333;
			padding: 30rpx 20rpx;
			border-bottom: 2rpx solid #e6e6e6;
			margin-left: 3%;
			margin-right: 3%;
		}
	}

	.background {
		background-image: -webkit-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -o-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -moz-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
	}
</style>