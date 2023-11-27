<template>
	<view>
		<!-- 24小时折线图 -->
		<view class="charts">
			<l-echart ref="chart" @finished="init" :isDisableScroll="false" :enableHover="true"></l-echart>
		</view>
		<!-- <view class="charts-box">
			<qiun-data-charts type="line" :chartData="weatherData" />
		</view> -->
	</view>
</template>

<script>
	import * as echarts from 'echarts'

	export default {
		props: {
			hourly: {
				type: Array,
				default: () => ([]),
			}
		},
		data() {
			return {
				option: {},
				weatherData: {}
			};
		},
		watch: {
			hourly: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal)
				this.update()
			}
		},
		methods: {
			getHours(time) {
				const date = new Date(time);
				const now = new Date();
				if (now.getHours() == date.getHours()) {
					return "现在"
				}
				return date.getHours() + "时"
			},
			// 2、或者使用组件的finished事件里调用
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			},
			update() {
				this.option = {
					// dataZoom: [

					// 	//滑动条
					// 	{

					// 		xAxisIndex: 0, //这里是从X轴的0刻度开始

					// 		show: true, //是否显示滑动条，不影响使用

					// 		type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件

					// 		startValue: 0, // 从头开始。

					// 		endValue: 6, // 一次性展示6个。

					// 	},

					// ],
					grid: {
						left: '0%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					title: {
						text: '未来24小天气'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {},
					toolbox: {
						show: false,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['line', 'bar']
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.hourly.map(item => this.getHours(item.fxTime))
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						}
					},
					series: [{
							name: '气温',
							type: 'line',
							stack: 'Total',
							smooth: true,

							lineStyle: {
								width: 1
							},
							showSymbol: true,
							areaStyle: {
								opacity: 0.8,
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: 'rgb(28, 223, 255)'
									},
									{
										offset: 1,
										color: 'rgb(194, 239, 191)'
									}

								])
							},
							emphasis: {
								focus: 'series'
							},
							data: this.hourly.map(item => item.temp),
							markPoint: {
								data: [{
										type: 'max',
										name: 'Max'
									},
									{
										type: 'min',
										name: 'Min'
									}
								]
							},
							// markLine: {
							// 	data: [{
							// 		type: 'average',
							// 		name: 'Avg'
							// 	}]
							// }
						}

					]

				}
				var str = JSON.stringify(this.option)
				console.log(str)
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(this.option);
				});
				const res = {
					"categories": this.hourly.map(item => this.getHours(item.fxTime)),
					"series": [{
						"name": "气温",
						"data": this.hourly.map(item => item.temp)
					}]
				}
				this.weatherData = JSON.parse(JSON.stringify(res));
			},
		},

		// 组件能被调用必须是组件的节点已经被渲染到页面上
		// 1、在页面mounted里调用，有时候mounted 组件也未必渲染完成
		mounted() {
			console.log(this.hourly)
			this.update();
		}
	}
</script>

<style lang="less">
	.charts {
		// width: 100%;
		display: flexbox;
		flex-direction: row;
		flex-grow: 2;
		margin: 5%;
	}
</style>