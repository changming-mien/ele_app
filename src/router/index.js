import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	// name: 'index',
	component: ()=>import("../views/Index.vue"),
	children:[{
		path:'',
		redirect:'/home',
	},{
		path:'/home',
		name:'home',
		component:()=>import("../views/Home.vue")
	},{
		path:'/order',
		name:'order',
		component:()=>import("../views/Order.vue")
	},{
		path:'/me',
		name:'me',
		component:()=>import("../views/Me.vue")
	}]
},{
	path: '/login',
	name: 'Login',
	component: Login
},{
	path:'/address',
	name:'address',
	component:()=>import("../views/Address.vue")
},{
	path:'/city',
	name:'city',
	component:()=>import("../views/City.vue")
},{
	path:'/search',
	name:'search',
	component:()=>import("../views/Search.vue")
},{
	path:'/shop',
	component:()=>import("../views/Shops/Shop.vue"),
	redirect:'/goods',
	children:[{
		path:'/goods',
		name:'goods',
		component:()=>import("../views/Shops/Goods.vue")
	},{
		path:'/comments',
		name:'comments',
		component:()=>import("../views/Shops/Comments.vue")
	},{
		path:'/seller',
		name:'seller',
		component:()=>import("../views/Shops/Seller.vue")
	}]
},{
	path:'/myAddress',
	name:'myAddress',
	component:()=>import("../views/orders/myAddress.vue")
},{
	path:'/addAddress',
	name:'addAddress',
	component:()=>import("../views/orders/addAddress.vue")
},{
	path:'/settlement',
	name:'settlement',
	component:()=>import("../views/orders/Settlement.vue")
},{
	path:'/remark',
	name:'remark',
	component:()=>import("../views/orders/Remark.vue")
},{
	path:'/pay',
	name:'pay',
	component:()=>import("../views/orders/Pay.vue")
},{
	path:'/orderInfo',
	name:'orderInfo',
	component:()=>import("../views/orders/OrderInfo.vue")
}]

const router = new VueRouter({
	mode:"history",
	routes
});
router.beforeEach((to, from, next)=> {
	let isLogin = localStorage.ele_login ? true : false;
	if (to.path == "/login") {
		next()
	} else {
		isLogin ? next() : next("/login");
	}
});

export default router