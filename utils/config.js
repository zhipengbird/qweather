const apidevKey = '0356262963e644afb0f786f9e30d1f0f'
const apiKey = 'bfbbba6ab3ff49709e7c0911ef9ba7e0'
const devUrl = 'https://devapi.qweather.com'
const baseUrl = 'https://api.qweather.com'
const searchbaseUrl = 'https://geoapi.qweather.com'
const isDev = false
var appKey = () => {
	if (isDev) {
		return apidevKey
	}
	return apiKey
}
var weatherBaseUrl = () => {
	if (isDev) {
		return devUrl
	}
	return baseUrl
}
var addSearchUrl = () => {
	return searchbaseUrl
}
export default {
	appKey,
	weatherBaseUrl,
	addSearchUrl
}