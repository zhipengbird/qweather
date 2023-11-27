<template>
	<view class="citylist-container">
		<city-card v-for="(item,index) in citys" :key="index" :city="item"></city-card>
	</view>
</template>

<script>
	import CityCard from '@/component/CityCardItem/CityCardItem.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			CityCard
		},
		data() {
			return {

			};
		},
		computed: {
			...mapState({
				citys: state => state.citys.cityList,
				selectCity: state => state.citys.citySelect
			})
		},
	}
</script>

<style lang="less">
	.citylist-container {
		display: flex;
		flex-direction: column;
	}
</style>