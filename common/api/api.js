import Request from '@/utils/request.js'
let request = new Request().http

//全局定义请求头
export default {
	// 请求样式
	getSwiperList: function() {
		return request({
			url: "api/public/v1/home/swiperdata",
			method: "get"
		})
	},
	getNavList: function() {
		return request({
			url: "/api/public/v1/home/catitems",
			method: 'get'
		})
	},
	getFloorList: function() {
		return request({
			url: "/api/public/v1/home/floordata",
			method: "get"
		})
	},
	getCateList: function() {
		return request({
			url: "/api/public/v1/categories",
			method: "get"
		})
	},
	getSearchList: function(data) {
		return request({
			url: "/api/public/v1/goods/qsearch",
			method: "get",
			data
		})
	},
}
