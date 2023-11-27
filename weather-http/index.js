import http from './interface'
import Config from '@/utils/config.js'

export const weather_now = (location) => {
	return http.get('/v7/weather/now', {
		key: Config.appKey(),
		location: location,
	}, {
		dataType: 'json',
	})
}

export const weather_day7 = (location) => {
	return http.get('/v7/weather/7d', {
		key: Config.appKey(),
		location: location,
	}, {
		dataType: 'json',
	})
}

export const weather_indices = (location) => {
	return http.get('/v7/indices/1d', {
		key: Config.appKey(),
		location: location,
		type: 0
	}, {
		dataType: 'json',
	})
}
export const weather_hour24 = (location) => {
	return http.get('/v7/weather/24h', {
		key: Config.appKey(),
		location: location,
	}, {
		dataType: 'json',
	})
}
export const city_search = (location) => {
	console.log("cityserach", location)
	return http.get('/v2/city/lookup', {
		key: Config.appKey(),
		location: location,
	}, {
		dataType: 'json',
		baseUrl: Config.addSearchUrl()
	})
}
export const weather_AQI = (location) => {
	return http.get('/v7/air/now', {
		key: Config.appKey(),
		location: location,
	}, {
		dataType: 'json',
	})
}