<template>
	<view class="c-city-weather-hour24">
		<view class="qweather-title">
			24小时预报
		</view>
		<view class="city-hour24__chart">
			<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
		</view>
		<view class="hour24">
			<view class="hour24__item" v-for="(item,index) in hourly" :key="index">
				<view :class="`qi-${item.icon}`">

				</view>
				<image src="../../static/images/arrow.png" mode="" :style="`transform: rotate(${item.wind360}deg);`"
					class="icon">
				</image>
				<view class="">
					{{getHours(item.fxTime)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			hourly: {
				type: Array
			},
		},
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#FAC858", "#EE6666", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08,
							linearType: "custom",
							seriesGap: 5,
							linearOpacity: 0.5,
							barBorderCircle: true,
							customColor: [
								"#FA7D8D",
								"#EB88E2"
							]
						}
					}
				}
			};
		},
		mounted() {
			this.update()
		},
		watch: {
			daily: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal)
				this.update()
			}
		},
		computed: {
			weatherlist() {

			}
		},
		methods: {
			getHours(time) {
				console.log(time)
				const date = new Date(time);
				// console.log(date.getHours())
				const now = new Date();
				if (now.getHours() == date.getHours() && now.getDate() == date.getDate()) {
					return "现在"
				}
				return date.getHours() + "时"
			},

			update() {
				let res = {
					categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
					series: [{
							name: "目标值",
							data: [35, 36, 31, 33, 13, 34]
						},

					]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			}
		}

	}
</script>

<style lang="less">
	@card-background-color: #F7F8F9;
	@card-border-color: #F2F4FA;
	@text-black-1: rgba(0, 0, 0, 1);

	.c-city-weather-hour24 {
		border-radius: 16px;
		background-color: @card-background-color;
		border: 1px solid @card-border-color;
		padding: 30px 0 24px;
		margin: 3%;

		.city-hour24__chart {
			margin: 10px 20px 5px;
			height: 153px;

		}

		.hour24 {
			padding: 0 22px 0 26px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.hour24__item {
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>