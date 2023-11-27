<template>
	<view>
		<view class="c-city-weather-forecast" v-if="daily.length > 0">
			<view class="qweather-title">
				未来天气
			</view>
			<view class="city-weather-forecast__tabs">
				<view class="city-forecast-tabs__row" v-for="(item,index) in daily" :key="index">
					<view class="date-bg">
						<view class="date">
							<p> {{getWeekDay(item.fxDate)}}</p>
							<p>{{ getDateInfo(item.fxDate)}}</p>
						</view>
						<view :class="`qi-${item.iconDay}`" class="icon">
						</view>

					</view>
					<view class="tmp-line-bg">
						<view class="space">

						</view>
						<view class="tmp-cont">
							<view class="temp">
								{{item.tempMax}}°
							</view>
							<view class="tmp-line">

							</view>
							<view class="temp">
								{{item.tempMin}}°
							</view>
						</view>
						<view class="space">

						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			daily: {
				type: Array,
				default: () => ([]),
			}
		},
		watch: {
			daily: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal)
				// this.update()
			}
		},
		data() {
			return {

			};
		},
		methods: {
			getWeekDay(time) {
				const valentines = new Date(time);
				const day = valentines.getDay();
				const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
				const now = new Date()
				if (now.getDate() == valentines.getDate()) {
					return "今天"
				}
				return dayNames[day]
				console.log(dayNames[day]); // "Monday"

			},
			getDateInfo(time) {
				const times = new Date(time)
				return (times.getMonth() + 1) + "/" + times.getDate()
			}
		}
	}
</script>

<style lang="less">
	@card-background-color: #F7F8F9;
	@card-border-color: #F2F4FA;
	@text-black-1: rgba(0, 0, 0, 1);

	.c-city-weather-forecast {
		padding: 30px 0 20px;
		border-radius: 16px;
		background-color: @card-background-color;
		border: 1px solid @card-border-color;
		margin: 3%;


		.qweather-title {
			font-size: 20px;
			font-weight: 500;
			line-height: 22px;
			text-align: center;
		}

		// .qweather-title {
		// 	font-size: 20px;
		// 	font-weight: 500;
		// 	line-height: 22px;
		// 	color: @text-black-1;
		// 	text-align: center;
		// 	.qweather-title {
		// 		text-align: center;
		// 		font-size: 40rpx;
		// 	}
		// }

		.city-weather-forecast__tabs {
			margin-top: 28px;
			padding: 0 24px;

			.city-forecast-tabs__row {
				padding: 9px 0;
				margin-top: 6px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.date-bg {
					display: flex;
					flex: 0 0 143rpx;
					width: 0;
					flex-direction: row;
					white-space: nowrap;
					margin: 0 41px 0 0;
					align-items: center;

					.date {
						display: inline-block;
						vertical-align: middle;
						// width: 55rpx;
						white-space: nowrap;
						font-size: 20px;
						line-height: 1;
						color: @text-black-1;

						p {
							padding-top: 10rpx;
						}

						:last-child {
							font-size: 18px;
							line-height: 1;
							color: #333333;
							text-align: end;
						}
					}

					.icon {
						font-size: 38px;
						text-align: center;
						padding-left: 20px;
					}
				}

				.tmp-line-bg {
					display: flex;
					align-items: center;
					flex: 1 0;

					// width: 0;
					.spance {
						width: 0;
						max-width: calc(100% - 95px);
					}

					.tmp-cont {
						display: flex;
						flex-direction: row;
						align-items: center;
						flex: 1 0;
						width: 0;
						min-width: 95rpx;

						.temp {
							display: inline-block;
							vertical-align: middle;
							font-size: 18px;
							font-weight: 500;
							line-height: 1;
							color: var(--text-black-1);
							white-space: nowrap;
							text-align: right;
							flex: 0 0 42px;
							padding-right: 4px;
							padding-left: 0;
							width: 0;
						}

						.tmp-line {
							display: inline-block;
							vertical-align: middle;
							height: 5px;
							border-radius: 5px;
							margin: 0;
							background-image: -webkit-linear-gradient(to right, #F18360, #427BFF);
							background-image: -o-linear-gradient(to right, #F18360, #427BFF);
							background-image: -moz-linear-gradient(to right, #F18360, #427BFF);
							background-image: linear-gradient(to right, #F18360, #427BFF);
							flex: 1 0;
							width: 0;
						}
					}
				}
			}
		}
	}
</style>