<template>
	<!-- 24小时卡片 -->
	<view class="container background" v-if="hours.length != 0">
		<view class="desc">
			24小时天气
		</view>
		<view class="hourly">

			<view class="hours-item" v-for="(item,index) in hours" :key="item.fxTime">
				<view class="info">
					{{getHours(item.fxTime)}}
				</view>
				<view class="info" :class="`qi-${item.icon}`">
				</view>
				<view class="info">
					{{item.temp}}˚
				</view>
				<view class="info">
					{{item.text}}
				</view>

			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			hours: {
				type: Array
			},
		},
		data() {
			return {

			};
		},
		methods: {
			getHours(time) {
				// console.log(time)
				const date = new Date(time);
				// console.log(date.getHours())
				const now = new Date();
				if (now.getHours() == date.getHours() && now.getDate() == date.getDate()) {
					return "现在"
				}
				return date.getHours() + "时"
			},


		}
	}
</script>

<style lang="less" scoped>
	.container {
		border-radius: 16px;
		padding: 30px 20px 20px;
		margin: 3%;
		box-sizing: border-box;
		border: none;
		background-color: #F7F8F9;

		.desc {
			font-size: 20px;
			font-weight: 500;
			line-height: 22px;
			text-align: center;
		}

	}

	.hourly {
		display: flex;
		flex-direction: row;
		// justify-content: space-around;
		// align-items: flex-start;
		overflow: auto;
		margin-top: 10px;

		.hours-item {
			display: flexbox;
			flex-direction: row;
			flex-shrink: 2;
			flex-grow: 2;
			justify-content: space-around;
			align-items: center;
			padding: 10rpx;
			min-width: 80rpx;

			.info {
				flex-grow: 2;
				padding: 5rpx;
				display: block;
				text-align: center;
			}
		}
	}

	.background {
		background-image: -webkit-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -o-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -moz-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
	}
</style>