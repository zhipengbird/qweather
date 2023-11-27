<template>
	<view>
		<view class="city-container" :class="`city-weather-${bgimage}`" @click="cityWeatherDetail">
			<view class="current-weather__bg">
				<view class="location-info">
					<view class="city-info">
						<view class="city-name">
							{{this.$props.city.name}}
						</view>
						<view class="city-update-time">
							{{updateTime}}
						</view>
					</view>
					<view class="city-temp">
						{{now.temp}}˚
					</view>
				</view>
				<view class="weather-info">
					<view class="weather-desc">
						{{now.text}}
					</view>
					<view class="weather-wind">
						{{now.windDir}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		weather_now
	} from "@/weather-http/index.js"
	export default {
		props: {
			city: Object,
			default: () => ({
				"name": "南昌县",
				"id": "101240103",
			}),
		},

		data() {
			return {
				now: {}
			}
		},
		mounted() {
			// console.log(this.$props.city.name, this.$props.city.id)
			// console.log("mounted 1")
			this.getWeatherInfo()
		},
		methods: {
			getWeatherInfo() {
				weather_now(this.$props.city.id).then((res) => {
					this.now = res.data.now
					// console.log((this.now))
				});
			},
			cityWeatherDetail() {
				this.$store.commit('selectCity', this.$props.city);
				uni.navigateTo({
					url: '/pages/cityWeather/cityWeather',
					animationDuration: 300,
					animationType: 'pop-in'
				})
			}
		},
		computed: {
			updateTime() {
				const date = new Date(this.now.obsTime)
				// return date.getHours() + ":" + date.getMinutes()
				return date.toLocaleTimeString('en', {
					hour: "2-digit",
					minute: "2-digit"
				})
			},
			bgimage() {
				if (!this.now.text) {
					return
				}
				let weather = this.now.text
				// console.log("weather" + weather)
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
		}
	}
</script>

<style lang="less" scoped>
	@card-background-color: #F7F8F9;
	@card-border-color: #F2F4FA;
	@text-black-1: rgba(0, 0, 0, 1);

	.city-container {
		display: flex;
		flex-direction: column;
		padding: 5px 0 5px;
		border-radius: 16px;
		margin: 10rpx;



		.location-info {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
			align-items: center;

			.city-info {
				display: flex;
				flex-direction: column;

				.city-name {
					font-size: 20px;
				}

				.city-update-time {
					padding-top: 10px;
					font-size: 18px;
				}

			}

			.city-temp {
				font-size: 30px;
			}
		}

		.weather-info {
			display: flex;
			justify-content: space-between;

			.weather-desc {
				font-size: 20px;
			}

			.weather-wind {
				font-size: 20px;
			}

		}
	}

	.city-weather-sun {
		background-image: -webkit-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -o-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: -moz-linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
		background-image: linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb);
	}

	.current-weather__bg {
		padding: 24rpx 30rpx;
		background-size: 540rpx auto;
		background-repeat: no-repeat;
		background-position: right top;
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