import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// import api from 'weather-http/index.js'
import store from '@/store/index.js'
// #ifdef H5
const vconsole = require('vconsole')
Vue.prototype.$vconsole = new vconsole() // 使用vconsole
// #endif

// 全局挂载后使用
Vue.config.productionTip = false
// Vue.prototype.$api = api

App.mpType = 'app'
const app = new Vue({
	store,
	render: h => h(App),
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif