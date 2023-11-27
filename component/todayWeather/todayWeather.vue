<template>
	<view class="l-page-city-weather" v-if="Object.keys(weatherNowInfo).length > 0">
		<view class="l-page-city-weather__current">
			<view class=" c-city-weather-current" :class="`city-weather-${bgimage}`">
				<view class="current-weather__bg">

					<view class="current-live">
						<view class="current-live__item">
							<view class="icon">
								<i :class="`qi-${weatherNowInfo.icon}`"></i>
							</view>
							<view class="cityInfo">
								{{city}}
							</view>
						</view>
						<view class="current-live__item">
							<view class="temp"> {{weatherNowInfo.temp}}°</view>
							<view class="tempdesc"> {{weatherNowInfo.text}}</view>
							<view class="air-tag" :class="`air-tag--${now.level}`" v-if="now.category">
								{{now.category}}
							</view>
						</view>

					</view>

					<!-- <view class="current-abstract">
						今天白天多云，夜晚晴，温度和昨天差不多，现在27°，空气不错。
					</view> -->
					<view class="current-basic">
						<view class="current-basic___item">
							<view class="value">
								{{weatherNowInfo.windScale}} 级

							</view>
							<view class="desc">
								{{weatherNowInfo.windDir}}
							</view>
						</view>
						<view class="current-basic___item">
							<view class="value">
								{{weatherNowInfo.humidity}} %

							</view>
							<view class="desc">
								相对湿度
							</view>
						</view>

						<view class="current-basic___item">
							<view class="value">
								{{ultravioletray}}
							</view>
							<view class="desc">
								紫外线
							</view>
						</view>
						<view class="current-basic___item hidden-740">
							<view class="value">
								{{weatherNowInfo.feelsLike}}°

							</view>
							<view class="desc">
								体感温度
							</view>
						</view>
						<view class="current-basic___item hidden-740">
							<view class="value">
								{{weatherNowInfo.vis}}km

							</view>
							<view class="desc">
								能见度
							</view>
						</view>
						<view class="current-basic___item hidden-740">
							<view class="value">
								{{weatherNowInfo.precip}}mm

							</view>
							<view class="desc">
								降水量
							</view>

						</view>
						<view class="current-basic___item hidden-740">
							<view class="value">
								{{weatherNowInfo.pressure}}hPa
							</view>
							<view class="desc">
								大气压
							</view>
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
			weatherNowInfo: {
				type: Object
			},
			today: {
				type: Object
			},
			now: {
				type: Object
			},
			city: {
				type: String
			}
		},
		data() {
			return {

			};
		},
		methods: {

		},
		computed: {
			ultravioletray() {
				let ray = this.today.uvIndex
				if (ray >= 10) {
					return "很强";
				} else if (ray >= 7) {
					return "强";
				} else if (ray >= 5) {
					return "中等";
				} else if (ray >= 5) {
					return "弱";
				} else {
					return "最弱";
				}
			},
			bgimage() {
				let weather = this.weatherNowInfo.text
				if (weather.includes('云')) {
					return 'cloudy'
				}
				if (weather.includes('晴')) {
					return 'sun'
				}
				if (weather.includes('雨')) {
					return 'rain'
				}
				if (weather.includes('雪')) {
					return 'snow'
				}
				return 'haze'
			}
		},
	}
</script>

<style lang="less">
	@city-weather-current-background-color: rgba(0, 0, 0, 0.03);
	@text-black-2: rgba(0, 0, 0, 0.5);
	@text-black-1: rgba(0, 0, 0, 1);

	.l-page-city-weather {
		// padding: 40rpx 20rpx 10rpx 20rpx;
		margin: 3%;
	}

	.l-page-city-weather .l-page-city-weather__current {
		// margin-bottom: 20px;
	}

	.c-city-weather-current {
		border: none;
		border-radius: 16px;

		@media (max-width: 739px) {
			.container {
				max-width: 540rpx;
			}

			// .hidden-740 {
			// 	display: none !important;
			// }
		}

		.current-live {
			margin-top: 6px;
			white-space: nowrap;

			.current-live__item {
				display: inline-block;
				vertical-align: middle;
				position: relative;
				width: 50%;
				max-width: 50%;

				.icon {
					background-color: transparent;
					border-radius: .25rem;
					font-size: 3.5rem;
					text-align: right;
				}

				.temp {
					font-size: 52rpx;
					line-height: 1;
					padding-left: 10px;
				}

				.tempdesc {
					font-size: 30rpx;
					font-weight: 500;
					padding-left: 10px;
				}
			}

			.cityInfo {
				display: inline-block;
				font-size: 30rpx;
				top: 10rpx;
				position: absolute;
			}

			.air-tag {
				display: inline-block;
				// width: 160rpx;
				padding: 8rpx 15rpx;
				font-size: 30rpx;
				line-height: 38rpx;
				text-align: center;
				white-space: nowrap;
				border-radius: 30rpx;
				color: white;
				position: absolute;
				top: -15rpx;
				right: -20rpx;
				min-width: 50px;
			}

		}

		.current-weather__bg {
			padding: 24rpx 30rpx;
			background-size: 540rpx auto;
			background-repeat: no-repeat;
			background-position: right top;
		}

		.current-abstract {
			margin: 26rpx auto 30rpx;
			max-width: 514rpx;
			min-height: 32rpx;
			font-size: 15rpx;
			line-height: 1.5;
			text-align: center;
			color: @text-black-1;
		}

		.current-basic {
			// height: 84px;
			padding: 0 24px;
			border-radius: 12px;
			background-color: @city-weather-current-background-color;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 3%;

			.current-basic___item {
				margin: 4%;
				align-items: center;

				.value {
					font-size: 30rpx;
					font-weight: 500;
					color: @text-black-1;
					white-space: nowrap;
					text-align: center;
				}

				.desc {
					margin-top: 7rpx;
					font-size: 25rpx;
					font-weight: normal;
					color: @text-black-2;
					text-align: center;
				}
			}
		}

		.current-weather__bg.index {
			padding: 20px;
			background-size: 346px auto;
		}



		.air-tag:hover {
			color: white;
		}

		.air-tag--1 {
			color: white;
			background-color: #95B359;
		}

		.air-tag--2 {
			color: white;
			background-color: #A9A538;
		}

		.air-tag--3 {
			color: white;
			background-color: #E0991D;
		}

		.air-tag--4 {
			color: white;
			background-color: #D96161;
		}

		.air-tag--5 {
			color: white;
			background-color: #A257D0;
		}

		.air-tag--6 {
			color: white;
			background-color: #D94371;
		}
	}



	.city-weather-sun {
		background-image: -webkit-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -o-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -moz-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
	}

	.city-weather-sun .current-weather__bg {
		background-image: none;
	}

	.city-weather-cloudy {
		background-image: -webkit-linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
		background-image: -o-linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
		background-image: -moz-linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
		background-image: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);

		.current-weather__bg {
			background-image: url('/static/images/city-weather/cloudy--day.png');
		}
	}


	.city-weather-rain {
		background-image: -webkit-linear-gradient(225deg, #DBEBFF, #DDE5F4 55%, #BECDDD);
		background-image: -o-linear-gradient(225deg, #DBEBFF, #DDE5F4 55%, #BECDDD);
		background-image: -moz-linear-gradient(225deg, #DBEBFF, #DDE5F4 55%, #BECDDD);
		background-image: linear-gradient(225deg, #DBEBFF, #DDE5F4 55%, #BECDDD);

		.current-weather__bg {
			background-image: url('/static/images/city-weather/rain--day.png');
		}
	}


	.city-weather-snow {
		background-image: -webkit-linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED);
		background-image: -o-linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED);
		background-image: -moz-linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED);
		background-image: linear-gradient(225deg, #D2F0FD, #E6F8FE 55%, #D6EDED);

		.current-weather__bg {
			background-image: url('/static/images/city-weather/snow--day.png');
		}
	}



	.city-weather-haze {
		background-image: -webkit-linear-gradient(225deg, #b29c82, #ded9d7 64.29%, #d9d7dc);
		background-image: -o-linear-gradient(225deg, #b29c82, #ded9d7 64.29%, #d9d7dc);
		background-image: -moz-linear-gradient(225deg, #b29c82, #ded9d7 64.29%, #d9d7dc);
		background-image: linear-gradient(225deg, #b29c82, #ded9d7 64.29%, #d9d7dc);

		.current-weather__bg {
			background-image: url('/static/images/city-weather/haze--day.png');
		}
	}
</style>