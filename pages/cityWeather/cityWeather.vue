<template>
	<view class="container">
		<today-weather :now='now' :weatherNowInfo="weatherNowInfo" :today="today" :city="city.name"></today-weather>
		<hours-weather :hours="hours"></hours-weather>
		<!-- <hours-weather-card :hourly="hours"></hours-weather-card> -->
		<!-- <hours-line :hourly="hours"></hours-line> -->
		<!-- <days-weather :daily="daily"></days-weather> -->
		<days-weather-card :daily="daily"></days-weather-card>
		<city-weather-indices :daily="indices"></city-weather-indices>

	</view>

</template>

<script>
	import todayWeather from "@/component/todayWeather/todayWeather.vue"
	import hoursWeather from "@/component/hoursWeather/hoursWeather.vue"
	import hoursLine from "@/component/hoursLine/hoursLine.vue"
	import daysWeather from "@/component/daysWeather/daysWeather.vue"
	import hoursWeatherCard from '@/component/hoursWeatherCard/hoursWeatherCard.vue'
	import daysWeatherCard from '@/component/daysWeatherCard/daysWeatherCard.vue'
	import cityWeatherIndices from '@/component/cityWeatherIndices/cityWeatherIndices.vue'
	import {
		weather_AQI,
		weather_day7,
		weather_hour24,
		weather_now,
		weather_indices
	} from "@/weather-http/index.js"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			todayWeather,
			hoursWeather,
			hoursLine,
			daysWeather,
			hoursWeatherCard,
			daysWeatherCard,
			cityWeatherIndices
		},
		mounted() {
			console.log("mounted 1")
			this.getWeatherInfo()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.city.name
			});
		},
		data() {
			return {
				getSystemInfo: {},
				getMobileInfo: {},
				location: {},
				weatherNowInfo: {},
				today: {},
				now: {},
				hours: [],
				daily: [],
				indices: []

			}
		},
		// async onLoad() {
		// 	console.log("onload 1")
		// 	let that = this
		// 	uni.getSystemInfo({
		// 		success(res) {
		// 			// console.log(res)
		// 			that.getSystemInfo = res
		// 		}
		// 	})
		// 	// // #ifdef MP-WEIXIN
		// 	// this.getMobileInfo = uni.getMenuButtonBoundingClientRect()
		// 	// this.location = await Helper.Wechat()
		// 	// console.log(this.location)
		// 	// // #endif
		// 	// // #ifdef APP-PLUS
		// 	// this.location = await Helper.App()
		// 	// console.log(this.location)
		// 	// // #endif
		// 	// // #ifdef H5
		// 	// this.location = await Helper.H5()
		// 	// // #endif
		// 	this.getWeatherInfo()
		// },
		computed: {
			...mapState({
				city: state => state.citys.citySelect
			})
		},
		methods: {
			getWeatherInfo() {

				weather_now(this.city.id).then((res) => {
					// console.log(res.data)
					this.weatherNowInfo = res.data.now
					console.log((this.weatherNowInfo))
					// this.weather_now = res.data.data;
				});
				weather_AQI(this.city.id).then((res) => {
					// console.log(res.data)
					this.now = res.data.now
					console.log((this.now))
					// this.weather_now = res.data.data;
				});
				weather_hour24(this.city.id).then((res) => {
					// console.log(res.data)
					this.hours = res.data.hourly
					console.log((this.hours))
					// this.weather_now = res.data.data;
				});
				weather_day7(this.city.id).then((res) => {
					// console.log(res.data)
					this.daily = res.data.daily
					console.log((this.daily))
					// this.weather_now = res.data.data;
				});
				weather_indices(this.city.id).then((res) => {
					// console.log(res.data)
					this.indices = res.data.daily
					console.log((this.daily))
					// this.weather_now = res.data.data;
				});
			},


		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		// width: 100%;
		overflow: hidden;
		// align-items: center;
		// overflow: hidden;
	}
</style>