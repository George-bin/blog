const home = {
  state: {
    // mobile侧边栏状态
    mobileAsideNav: false,
    openBgFlag: false
  },
  mutations: {
    SET_MOBILE_ASIDE_NAV (state, data) {
      state.mobileAsideNav = data
    },
    SET_OPEN_BG_FLAG (state, data) {
      state.openBgFlag = data
    }
  },
  actions: {}
}

export default home
