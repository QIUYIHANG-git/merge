import Vue from 'vue'

import App from './App.vue'
// 引入Cookie
import Cookie from 'js-cookie'
Vue.prototype.$Cookie = Cookie;
// 路由
import router from './router'
//vuex状态管理器
import store from './store'
// 引入网络请求axios
import axios from 'axios'

import {post,fetch,patch,put} from './http/requset.js'
//定义全局变量
Vue.prototype.$axios = axios
// http://192.168.168.190:13005
Vue.prototype.$http='http://192.168.168.190:13005';
Vue.prototype.$https = 'http://192.168.168.207:13005';
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

//引入echarts
import  echarts from 'echarts/lib/echarts.js';
import  "echarts/lib/chart/pie";
import 'echarts/lib/chart/line';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

// 引入炫酷的粒子动效
import  VueParticles from 'vue-particles'
Vue.use(VueParticles)

// 引入饿了么组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })

// 注册事件总线实例
Vue.prototype.$usd = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
