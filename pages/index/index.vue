<template>
	<view class="page-container">
		<view class="area-search">
			<input @input="cityInput" class="input" type="text" v-model="address" placeholder="搜索城市"
				placeholder-style="color:#000" />
		</view>
		<city-searc-card v-on:citySelected="citySelect" :cityList="citySearchList" :isShow="isShow_cityScroll">
		</city-searc-card>
		<view class="city-container">
			<!-- <city-weather :city="selectCity"> </city-weather> -->
			<city-list></city-list>
		</view>
	</view>

</template>

<script>
	import cityWeather from '@/pages/cityWeather/cityWeather.vue'
	import cityList from '@/pages/CityList/CityList.vue'
	import citySearcCard from '@/component/addressSearchCard/addressSearchCard.vue'
	import {
		city_search
	} from "@/weather-http/index.js"
	import {
		mapState
	} from 'vuex';
	import Helper from '@/utils/helper.js';

	export default {
		components: {
			cityWeather,
			citySearcCard,
			cityList,

		},
		data() {
			return {
				address: "",
				isShow_cityScroll: false,
				citySearchList: [],
				location: {}
			};
		},
		async onLoad() {
			console.log("index onload");
			// #ifdef APP-PLUS
			this.location = await Helper.App()
			console.log(JSON.stringify(this.location))
			// #endif
			// #ifdef H5
			this.location = await Helper.H5()
			console.log(JSON.stringify(this.location))

			// #endif
			if (this.location) {
				console.log('commit')
				this.$store.commit('addCity', this.location);
			}
		},
		computed: {
			...mapState({
				citys: state => state.citys.cityList,
				selectCity: state => state.citys.citySelect
			})
		},
		methods: {
			cityInput(e) {
				if (this.address) {
					this.isShow_cityScroll = true
					city_search(this.address).then((res) => {
						this.citySearchList = res.data.location
					});
				} else {
					this.isShow_cityScroll = false
				}
			},
			citySelect(city) {
				this.$store.commit('addCity', city)
				this.$store.commit('selectCity', city);
				this.address = ''
				this.isShow_cityScroll = false
				uni.navigateTo({
					url: '/pages/cityWeather/cityWeather',
					animationDuration: 300,
					animationType: 'pop-in'
				})
			}
		}
	}
</script>

<style lang="less">
	.page-container {
		display: flex;
		flex-direction: column;
	}

	.city-container {
		// overflow: auto;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: space-around;
		// width: 100%;
		// justify-content: space-evenly;
		align-items: flex-start;

	}

	.area-search {
		display: flex;
		height: 80rpx;
		align-items: center;
		justify-content: space-around;

		margin: 20rpx;
		border: 0.5px solid #d9d9d9;
		border-radius: 10rpx;

		.input {
			display: flex;
			outline: 0;
			padding: 5px;
			color: #333;
			font-size: 18px;
			margin: 20rpx;

			// width: 90%;


		}
	}
</style>