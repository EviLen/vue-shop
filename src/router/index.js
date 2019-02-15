import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      redirect: '/welcome',
      children: [{ path: '/welcome', component: Welcome }]
    }
  ]
})
// 路由导航守卫，检测token如果不存在，就跳转到登录页面组件中
router.beforeEach((to, from, next) => {
  // 访问/login就直接通过
  if (to.path === '/login') {
    return next()
  }
  // 访问的非、login页面，判断是否存在token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('./login')
  }
  next() // token 存在 则继续
})

export default router
