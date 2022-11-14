import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import api from '@/common/api/api.js'
// 1. 导入 store 的实例对象
import store from './store/store.js'

Vue.prototype.$http = api

// 封装弹框的方法
uni.$showMsg = function(title= "数据请求失败", duration = 1500) {
		uni.showToast({
			title,
			duration,
			icon:'none'
		})
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	// 2. 将 store 挂载到 Vue 实例上
	  store,
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
