<template>
	<view class="c-city-weather-indices" v-if="daily.length > 0">
		<view class="qweather-title">
			生活指数
		</view>
		<view class="city-indices__row">
			<view class="city-indices__item--bg" v-for="(item,index) in dataList" :key="index">
				<view class="city-indices__item">
					<view class="indices">
						<view class="indices-title">
							{{item.name}}
						</view>
						<view class="indices-level" :class="`indices-${category(item.type)}-level--${item.level}`">
							{{item.category}}
						</view>
					</view>
					<view class="indices-text">
						{{item.text}}
					</view>
				</view>

			</view>

		</view>
		<view class="unfload" @click="expanding()">
			<image src="../../static/images/unfload.png" mode="aspectFit" class="floadicon"
				:style="`transform: rotate( ${isExpanding ? 180 : 0 }deg);`">
			</image>
			<view class="">
				{{isExpanding ? "收起" : "展开"}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			daily: {
				type: Array
			}
		},
		data() {
			return {
				isExpanding: false
			};
		},
		computed: {
			dataList() {
				if (this.isExpanding == true) {
					return this.$props.daily
				} else {
					// const list = this.$props.daily.filter((item) => {
					// 	console.log(item.type, typeof(item.type))
					// 	if (['1', '2', '3', '4'].includes(item.type)) {
					// 		return item
					// 	}
					// })
					const list = this.$props.daily.filter(item => ['1', '3', '6', '8'].includes(item.type))
					return list
				}
			}
		},
		methods: {
			category(type) {
				switch (parseInt(type)) {
					case 1:
						return 'sport'
					case 2:
						return 'cw'
					case 3:
						return 'drsg'
					case 4:
						return 'sport'
					case 5:
						return 'uv'
					case 6:
						return 'trav'
					case 7:
						return 'ag'
					case 8:
						return 'comf'
					case 9:
						return 'flu'
					case 10:
						return 'air'
					case 11:
						return 'ac'
					case 12:
						return 'gl'
					case 13:
						return 'mu'
					case 14:
						return 'dc'
					case 15:
						return 'ptfc'
					case 16:
						return 'spi'

					default:
						break;
				}
			},
			expanding() {
				this.isExpanding = !this.isExpanding
			}
		}
	}
</script>

<style lang="less">
	@card-background-color: #F7F8F9;
	@card-border-color: #F2F4FA;
	@text-black-1: rgba(0, 0, 0, 1);

	.c-city-weather-indices {

		border-radius: 16px;
		border: 1px solid @card-border-color;
		padding: 30px 10px 20px;
		background-color: @card-background-color;
		margin: 3%;

		.qweather-title {
			font-size: 20px;
			font-weight: 500;
			line-height: 22px;
			text-align: center;
		}

		.unfload {
			// display: flexbox;
			font-size: 20rpx;
			text-align: end;
			justify-items: center;
			// align-items: center;

			.floadicon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.city-indices__row {
			display: flex;
			// align-items: ;
			flex-direction: row;
			margin-top: 16rpx;
			flex-wrap: wrap;

			.city-indices__item {
				border-radius: 16px;
				background-color: #fff;
				padding: 17px 15px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				.indices {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.indices-title {
					font-size: 30rpx;
					line-height: 1;
					color: #111111;
				}

				.indices-level {
					display: inline-block;
					padding: 2rpx 15rpx;
					font-size: 24rpx;
					text-align: center;
					border-radius: 30rpx;
					min-width: 100rpx;
					color: #333333;
				}

				.indices-text {
					margin-top: 7px;
					font-size: 20rpx;
					line-height: 1.5;
					color: #333333;
				}
			}

			.city-indices__item--bg {

				flex: 1 0 50%;
				width: 0;
				margin: 8px;
				display: flex;
				flex-direction: column;
			}
		}
	}

	.indices-sport-level--1 {
		background-color: #95B359;
	}

	.indices-sport-level--2 {
		background-color: #C7BC13;
	}

	.indices-sport-level--3 {
		background-color: #EC5252;
	}

	.indices-cw-level--1 {
		background-color: #95B359;
	}

	.indices-cw-level--2 {
		background-color: #C7BC13;
	}

	.indices-cw-level--3 {
		background-color: #EC5252;
	}

	.indices-cw-level--4 {
		background-color: #B145C6;
	}

	.indices-ac-level--1 {
		background-color: #95B359;
	}

	.indices-ac-level--2 {
		background-color: #C7BC13;
	}

	.indices-ac-level--3 {
		background-color: #EC5252;
	}

	.indices-ac-level--4 {
		background-color: #B145C6;
	}

	.indices-drsg-level--1 {
		background-color: #7746D6;
	}

	.indices-drsg-level--2 {
		background-color: #B145C6;
	}

	.indices-drsg-level--3 {
		background-color: #EC5252;
	}

	.indices-drsg-level--4 {
		background-color: #F18720;
	}

	.indices-drsg-level--5 {
		background-color: #FFC805;
	}

	.indices-drsg-level--6 {
		background-color: #C7BC13;
	}

	.indices-drsg-level--7 {
		background-color: #95B359;
	}

	.indices-uv-level--1 {
		background-color: #95B359;
	}

	.indices-uv-level--2 {
		background-color: #C7BC13;
	}

	.indices-uv-level--3 {
		background-color: #FFC805;
	}

	.indices-uv-level--4 {
		background-color: #EC5252;
	}

	.indices-uv-level--5 {
		background-color: #B145C6;
	}

	.indices-gl-level--1 {
		background-color: #95B359;
	}

	.indices-gl-level--2 {
		background-color: #C7BC13;
	}

	.indices-gl-level--3 {
		background-color: #FFC805;
	}

	.indices-gl-level--4 {
		background-color: #EC5252;
	}

	.indices-gl-level--5 {
		background-color: #B145C6;
	}

	.indices-ag-level--1 {
		background-color: #95B359;
	}

	.indices-ag-level--2 {
		background-color: #C7BC13;
	}

	.indices-ag-level--3 {
		background-color: #FFC805;
	}

	.indices-ag-level--4 {
		background-color: #EC5252;
	}

	.indices-ag-level--5 {
		background-color: #B145C6;
	}

	.indices-trav-level--1 {
		background-color: #95B359;
	}

	.indices-trav-level--2 {
		background-color: #C7BC13;
	}

	.indices-trav-level--3 {
		background-color: #FFC805;
	}

	.indices-trav-level--4 {
		background-color: #EC5252;
	}

	.indices-trav-level--5 {
		background-color: #B145C6;
	}

	.indices-comf-level--1 {
		background-color: #95B359;
	}

	.indices-comf-level--2 {
		background-color: #C7BC13;
	}

	.indices-comf-level--3 {
		background-color: #FFC805;
	}

	.indices-comf-level--4 {
		background-color: #F18720;
	}

	.indices-comf-level--5 {
		background-color: #EC5252;
	}

	.indices-comf-level--6 {
		background-color: #B145C6;
	}

	.indices-comf-level--7 {
		background-color: #7746D6;
	}

	.indices-mu-level--1 {
		background-color: #95B359;
	}

	.indices-mu-level--2 {
		background-color: #C7BC13;
	}

	.indices-mu-level--3 {
		background-color: #FFC805;
	}

	.indices-mu-level--4 {
		background-color: #F18720;
	}

	.indices-mu-level--5 {
		background-color: #EC5252;
	}

	.indices-mu-level--6 {
		background-color: #B145C6;
	}

	.indices-mu-level--7 {
		background-color: #7746D6;
	}

	.indices-mu-level--8 {
		background-color: #7746D6;
	}

	.indices-dc-level--1 {
		background-color: #95B359;
	}

	.indices-dc-level--2 {
		background-color: #C7BC13;
	}

	.indices-dc-level--3 {
		background-color: #FFC805;
	}

	.indices-dc-level--4 {
		background-color: #F18720;
	}

	.indices-dc-level--5 {
		background-color: #EC5252;
	}

	.indices-dc-level--6 {
		background-color: #B145C6;
	}

	.indices-ptfc-level--1 {
		background-color: #95B359;
	}

	.indices-ptfc-level--2 {
		background-color: #C7BC13;
	}

	.indices-ptfc-level--3 {
		background-color: #FFC805;
	}

	.indices-ptfc-level--4 {
		background-color: #F18720;
	}

	.indices-ptfc-level--5 {
		background-color: #EC5252;
	}

	.indices-spi-level--1 {
		background-color: #95B359;
	}

	.indices-spi-level--2 {
		background-color: #C7BC13;
	}

	.indices-spi-level--3 {
		background-color: #FFC805;
	}

	.indices-spi-level--4 {
		background-color: #F18720;
	}

	.indices-spi-level--5 {
		background-color: #EC5252;
	}

	.indices-flu-level--1 {
		background-color: #95B359;
	}

	.indices-flu-level--2 {
		background-color: #FFC805;
	}

	.indices-flu-level--3 {
		background-color: #EC5252;
	}

	.indices-flu-level--4 {
		background-color: #B145C6;
	}

	.indices-air-level--1 {
		background-color: #95B359;
	}

	.indices-air-level--2 {
		background-color: #A9A538;
	}

	.indices-air-level--3 {
		background-color: #E0991D;
	}

	.indices-air-level--4 {
		background-color: #D96161;
	}

	.indices-air-level--5 {
		background-color: #A257D0;
	}
</style>