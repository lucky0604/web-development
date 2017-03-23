/**
 * Created by lucky on 17-3-12.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  userInfo: null,    // 用户信息
  login: true,    // 是否登录
  imgPath: null,    // 头像地址
  latitude: '',    // 当前位置纬度
  longitude: '',    // 当前位置经度
  geohash: 'wtw3sm0q087',
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
