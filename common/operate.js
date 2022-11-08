export default {
	//接口
	api: function() {
		let version = wx.getAccountInfoSync().miniProgram.envVersion;
		switch (version) {
			case "develop": // 开发预览版
					return "https://www.uinav.com/"
					break;
			case 'trial': //体验版
					return "https://www.uinav.com/"
					break;
			case 'release': //正式版
					return 'https://www.uinav.com/'
			default: //未知，默认使用正式版
					return 'https://www.uinav.com/'
					break;
		}
	}
}