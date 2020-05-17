const home = {
  state: {
    // mobile侧边栏状态
    mobileAsideNav: false
  },
  mutations: {
    SET_MOBILE_ASIDE_NAV (state, data) {
      state.mobileAsideNav = data
    }
  },
  actions: {}
}

export default home
