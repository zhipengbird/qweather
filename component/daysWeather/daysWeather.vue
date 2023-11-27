<template>
	<view>
		<!-- 24小时折线图 -->
		<view class="charts" v-if="daily">
			<l-echart ref="chart" @finished="init" :isDisableScroll="false" :enableHover="true"></l-echart>
		</view>

	</view>
</template>

<script>
	import * as echarts from 'echarts'
	export default {
		props: {
			daily: {
				type: Array,
				default: () => ([]),
			}
		},
		data() {
			return {

				option: {}
			}
		},
		watch: {
			daily: function(newVal, oldVal) { // watch it
				console.log('Prop changed: ', newVal, ' | was: ', oldVal)
				this.update()
			}
		},
		methods: {
			// 2、或者使用组件的finished事件里调用
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			},
			getDate(time) {
				const date = new Date(time);
				const now = new Date();
				if (now.getDate() == date.getDate()) {
					return "今天"
				}
				return date.getDate() + '日'
			},
			update() {
				this.option = {

					title: {
						text: '未来7天'
					},
					grid: {
						left: '-1%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						// formatter: function(params, ticket, callback) {
						// 	console.log(params, ticket)
						// 	var htmlStr = '';
						// 	for (var j = 0; j < params.length; j++) {
						// 		var param = params[j];
						// 		var xName = param.name; // x轴的名称
						// 		var seriesName = param.seriesName; // 图例名称
						// 		var value = param.value == undefined ? '未知' : param.value; // y轴值
						// 		if (j === 0) {
						// 			htmlStr += xName + '<br/>'; //x轴的名称
						// 		}
						// 		htmlStr += '<text>';
						// 		if (seriesName === "最高温度" || seriesName === "最低温度") {
						// 			htmlStr += seriesName + '：' + value + '℃<br/>';
						// 		} else {
						// 			htmlStr += seriesName + '：' + value + "<br/>";
						// 		}
						// 		htmlStr += '</text>';
						// 	}
						// 	callback(ticket, toHTML(htmlStr));
						// }
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
						data: this.daily.map(item => this.getDate(item.fxDate))
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value} °C'
						},
						show: false
					},
					series: [{
						name: '最低气温',
						type: 'line',
						stack: 'Total',
						smooth: false,
						lineStyle: {
							width: 1
						},
						label: {
							show: true,
							position: 'top',
							formatter: function(params) {
								return params.value + "°C";
							}
						},
						showSymbol: true,
						// areaStyle: {
						// 	opacity: 0.8,
						// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						// 			offset: 0,
						// 			color: '#dce3ff'
						// 		},
						// 		{
						// 			offset: 1,
						// 			color: '#dce3f1'
						// 		}
						// 	])
						// },
						// emphasis: {
						// 	focus: 'series'
						// },
						data: this.daily.map(item => item.tempMin),

						// markLine: {
						// 	data: [{
						// 		type: 'average',
						// 		name: 'Avg'
						// 	}]
						// }
					}, {
						name: '最高气温',
						type: 'line',
						stack: 'Total',
						smooth: false,
						lineStyle: {
							width: 1
						},
						label: {
							show: true,
							position: 'top',
							formatter: function(params) {
								// 假设此轴的 type 为 'time'。
								return params.value + "°C";
							}
						},
						showSymbol: true,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#fee5ca'
								},
								{
									offset: 1,
									color: '#dce3fb'
								}
							])
						},
						emphasis: {
							focus: 'series'
						},
						data: this.daily.map(item => item.tempMax),

						// markLine: {
						// 	data: [{
						// 		type: 'average',
						// 		name: 'Avg'
						// 	}]
						// }
					}]

				}
				// var str = JSON.stringify(this.option)
				// console.log(str)
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(this.option);
				});
			},

		},
		// 组件能被调用必须是组件的节点已经被渲染到页面上
		// 1、在页面mounted里调用，有时候mounted 组件也未必渲染完成
		mounted() {
			// init(echarts, theme?:string, opts?:{}, chart => {})
			// echarts 必填， 非nvue必填，nvue不用填
			// theme 可选，应用的主题，目前只支持名称，如：'dark'
			// opts = { // 可选
			//  locale?: string  // 从 `5.0.0` 开始支持
			// }
			// chart => {} ， callback 返回图表实例
			this.$refs.chart.init(echarts, chart => {
				chart.setOption(this.option);
			});
			this.update();
		}
	}
</script>

<style lang="less">
	.charts {
		display: flex;
		margin: 1%;
		flex-grow: 2;
	}
</style>