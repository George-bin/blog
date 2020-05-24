<template>
  <div
    class="back-top-component">
    <transition name="fade">
      <div
        v-show="visible"
        class="back-top-box"
        @click="handleClickBackTop">
        <i class="el-icon-caret-top"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {
      visible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    /* eslint-disable */
    $(window).scroll(() => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      // console.log(scrollTop);
      if (scrollTop > 100) {
        this.visible = true
      } else {
        this.visible = false
      }
    })
    /* eslint-disable */
  },
  methods: {
    handleClickBackTop () {
      this.$backtopAni()
    }
  }
}
</script>

<style lang="scss">
.back-top-component {
  position: fixed;
  right: 40px;
  bottom: 40px;
  .back-top-box {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: white;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    border-radius: 50%;
    i {
      font-size: 18px;
      color: #0a419b;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  /* .fade-leave-active below version 2.1.8 */
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
