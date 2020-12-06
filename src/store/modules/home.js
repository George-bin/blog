const home = {
  state: {
    // mobile侧边栏状态
    mobileAsideNav: false,
    openBgFlag: false,
    isPC: false
  },
  mutations: {
    SET_MOBILE_ASIDE_NAV (state, data) {
      state.mobileAsideNav = data
    },
    SET_OPEN_BG_FLAG (state, data) {
      state.openBgFlag = data
    },
    SET_IS_PC (state, data) {
      state.isPC = data
    }
  },
  actions: {}
}

export default home
