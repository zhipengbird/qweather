var request = require('@/weather-http/index.js');
// #ifdef APP-PLUS
var isIos = plus.os.name == "iOS"
// #endif



function gotoSystemPermissionSetting() {
	if (isIos) {
		var UIApplication = plus.ios.import("UIApplication");
		var application2 = UIApplication.sharedApplication();
		var NSURL2 = plus.ios.import("NSURL");
		var setting2 = NSURL2.URLWithString("App-Prefs:root=LOCATION_SERVICES");
		application2.openURL(setting2);
		plus.ios.deleteObject(NSURL2);
		plus.ios.deleteObject(application2);
	} else {
		var main = plus.android.runtimeMainActivity();
		var Intent = plus.android.importClass("android.content.Intent");
		var mIntent = new Intent('android.settings.WIRELESS_SETTINGS');
		main.startActivity(mIntent);
	}
}

function gotoSystemPermissionLocation() {
	if (isIos) {
		gotoSystemPermissionSetting()
	} else {
		var main = plus.android.runtimeMainActivity();
		var Intent = plus.android.importClass("android.content.Intent");
		var mIntent = new Intent('android.settings.LOCATION_SOURCE_SETTINGS');
		main.startActivity(mIntent);
	}
}

function checkSystemEnableLocation() {
	if (isIos) {
		var result = false;
		var cllocationManger = plus.ios.import("CLLocationManager");
		var result = cllocationManger.locationServicesEnabled();
		plus.ios.deleteObject(cllocationManger);
		return result;
	} else {
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
		return result
	}
}

function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: (res) => {

				request.city_search(res.longitude + ',' + res.latitude)
					.then((res) => {
						console.log(JSON.stringify(res.data.location))
						resolve(res.data.location[0])
					}).catch((error) => {
						console.log(error)
						reject()
					});
			},
			fail: (e) => {
				console.log('uni.getLocation失败原因', e)
				reject()
			},
		})

	})
}
//排序
const ASCII = function(obj) {
	let arr = new Array();
	let num = 0;
	for (let i in obj) {
		arr[num] = i;
		num++;
	}
	let sortArr = arr.sort();
	//let sortObj = {};    //完成排序值
	let str = ''; //自定义排序字符串
	for (let i in sortArr) {
		str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
		//sortObj[sortArr[i]] = obj[sortArr[i]];
	}
	//去除两侧字符串
	let char = '&'
	str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');

	return str;
}
// jsonp网络请求
const jsonp = async (url, data) => {
	return new Promise((resolve, reject) => {
		// 1.初始化url
		let dataString = url.indexOf('?') === -1 ? '?' : '&'
		let callbackName = `jsonpCB_${ Date.now() }`;
		url += `${ dataString }callback=${ callbackName }`
		if (data) {
			// 2.有请求参数，依次添加到url
			for (let k in data) {
				url += `&${ k }=${ data[k] }`
			}
		}
		let scriptNode = document.createElement('script');
		scriptNode.src = url;
		// 3. callback
		window[callbackName] = (result) => {
			result ? resolve(result) : reject('没有返回数据');
			delete window[callbackName];
			document.body.removeChild(scriptNode);
		}
		// 4. 异常情况
		scriptNode.addEventListener('error', () => {
			reject('接口返回数据失败');
			delete window[callbackName];
			document.body.removeChild(scriptNode);
		}, false)
		// 5. 开始请求
		document.body.appendChild(scriptNode)
	})
}
//APP获取位置
const App = async () => {
	if (!checkSystemEnableLocation()) {
		return uni.showModal({
			title: '温馨提示',
			content: '是否开启GPS定位服务?',
			success: function(res) {
				if (res.confirm) {
					gotoSystemPermissionLocation()
				}
			}
		})
	}
	return await getLocation()

}

// 微信小程序获取位置
const WeChat = async () => {
	return new Promise((resolve, reject) => {
		uni.authorize({
			scope: 'scope.userLocation',
			async success(e) {
				resolve(await getLocation())
			},
			fail(e) {
				uni.showModal({
					content: '为了给您提供更好的服务,建议打开位置功能权限',
					confirmText: "确认",
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting({
								success: (res) => {
									console.log(
										'为了给您提供更好的服务,建议打开位置功能权限')
								},
								fail: (err) => {
									uni.showToast({
										title: '已默认城市 北京',
										icon: 'none',
									})
								}
							})
						} else {
							uni.showToast({
								title: '小主,您未开启位置授权',
								icon: 'none',
							})
						}
					}
				})
			}
		})
	})

}
// H5获取位置
const H5 = async () => {
	let res = await jsonp('https://restapi.amap.com/v3/ip', {
		key: '520c8812a0450b3074f8d9122ffbc1ec',
		output: "jsonp"
	});
	console.log('腾讯地图地址解析-H5', res);
	return new Promise((resolve, reject) => {
		request.city_search(res.rectangle.split(';')[0])
			.then((res) => {
				console.log(JSON.stringify(res.data.location))
				resolve(res.data.location[0])
			}).catch((error) => {
				console.log(error)
				reject()
			});
	})
}
module.exports = {
	ASCII,
	WeChat,
	H5,
	jsonp,
	App
};