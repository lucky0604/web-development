/**
 * Created by lucky on 17-3-9.
 *
 * 路由控制
 */
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')

export default [{
  path: '/',
  component: App,    // 顶层路由，对应index.html
  children: [{    // 二级路由，对应App.vue
    // 地址为空时跳转home页面
    path: '',
    component: home
  }, {
    // 首页城市列表
    path: '/home',
    component: home
  }, {
    // 当前选择城市页
    path: '/city/:cityid',
    component: city
  }, {
    path: '/login',
    component: login
  }, {
    // 所有商铺列表页
    path: '/msite',
    component: msite
  }]
}]