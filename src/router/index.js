import Vue from 'vue';
import VueRouter from 'vue-router';
//登录
import login from '../views/login/login.vue';
// 首页
import home from '../views/home/home.vue';

Vue.use(VueRouter)

const routes = [
  {
	  // 首页
    path: '/',
    name: 'login',
    component: login
  },
  {
	// 导航
    path: '/home/',
    name: 'home',
	component:home,
	children:[
		// 子路由重定向
		{
			// 首页
			path: '/',
			name: 'page',
			component: () => import('../views/page/page.vue')
		},
		{
			// 首页
			path: '/page',
			name: 'page',
			component: () => import('../views/page/page.vue')
		},
		/* 
			用户管理
		 */
		{
			// 用户管理
			path: '/userMange',
			name: 'userMange',
			component: () => import('../views/user/userMange/userMange.vue')
		},
		/*
			优惠管理
		 */
		{
			// 分配优惠
			path: '/distributionOfPreferential',
			name: 'distributionOfPreferential',
			component: () => import('../views/privilegeManagement/distributionOfPreferential/distributionOfPreferential.vue')
		},
		{
			// 赠送优惠
			path: '/presented',
			name: 'presented',
			component: () => import('../views/privilegeManagement/presented/presented.vue')
		},
		{
			// 现金购买
			path: '/cash',
			name: 'cash',
			component: () => import('../views/privilegeManagement/cash/cash.vue')
		},
		{
			// 活动卷
			path: '/activity',
			name: 'activity',
			component: () => import('../views/privilegeManagement/activity/activity.vue')
		},
		{
			//纸质卷
			path: '/paperCapacitor',
			name: 'paperCapacitor',
			component: () => import('../views/privilegeManagement/paperCapacitor/paperCapacitor.vue')
		}
	]
  }
] 

const router = new VueRouter({
  routes
})

export default router
