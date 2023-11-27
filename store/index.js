import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);
import citys from "./citys"
export default new Vuex.Store({
	modules: {
		citys
	}
})