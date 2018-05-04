// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui';
import axios from 'axios'
import store from './store/index.js'
import 'mint-ui/lib/style.css';
import '@/assets/css/my-mint.css';
import '@/assets/css/base.css';
import '@/assets/js/rem.js';
import '@/assets/js/sockjs.js';
import vueLazyLoad from 'vue-lazyload'

import 'url-search-params-polyfill'; // axios 兼容 userURLSearchParams的

import VueDplayer from 'vue-dplayer'
import '../node_modules/dplayer/dist/DPlayer.min.css'
Vue.use(VueDplayer)

Vue.use(MintUI);

Vue.use(vueLazyLoad, {
	loading: require('../static/test/test01.jpg')
})
axios.defaults.withCredentials = true //允许跨域

global.address = 'http://info.ezhihe.cn/'; //接口地址

global.address2 = 'http://work.ezhihe.cn/'; //接口地址
global.address3 = 'http://sdapi.ezhihe.cn/'; //接口地址

global.imgURL = 'http://res.ezhihe.cn/zlwx/convert'; //图片地址

global.axios = axios //设置为全局引用

Vue.config.productionTip = false
import { Toast, Indicator } from 'mint-ui';
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
