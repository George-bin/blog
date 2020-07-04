<template>
  <div
    class="m-bg-component"
    :class="{
      'm-bg-component-show': openBgFlag
    }"
    @click="handleClickSwitch">
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  prop: {},
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      openBgFlag: state => state.home.openBgFlag
    })
  },
  watch: {},
  created () {
  },
  mounted () {
  },
  beforeDestroy () {},
  destroyed () {},
  methods: {
    ...mapMutations([
      'SET_OPEN_BG_FLAG'
    ]),
    handleClickSwitch () {
      this.SET_OPEN_BG_FLAG(false)
    }
  }
}
</script>

<style lang="scss">
.m-bg-component {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: none;
  transition: all 0.5s;
  z-index: -1;
}
.m-bg-component-show {
  background: rgba(0, 0, 0, 0.3);
  z-index: 9997;
}
</style>
