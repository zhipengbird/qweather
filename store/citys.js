export default {
	state: {
		cityList: [{
			'name': '南昌',
			'id': '101240101'
		}, {
			"name": "南昌县",
			"id": "101240103",
		}],
		citySelect: {
			"name": "南昌县",
			"id": "101240103",
		}
	},
	mutations: {
		addCity(state, city) {
			const index = state.cityList.findIndex(item => item.name === city.name)
			console.log('city ', index)
			//不存在
			if (index === -1) {
				state.cityList.push(city)
				con
			}
		},
		selectCity(state, city) {
			state.citySelect = city
		},
		removeCity(state, city) {
			const index = state.cityList.findIndex(item => item.name === city.name)
			if (index != -1) {
				state.cityList.splice(index, 1)
			}
		}

	}
}