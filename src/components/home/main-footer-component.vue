<template>
  <footer class="main-footer-component">
    <div class="main-footer-box min-width">
      <p class="copyright">Copyright© 2019-2020 George的博客</p>
      <p class="record">京ICP备19037191</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
.main-footer-component {
  background: rgba(183, 203, 232, 0.3);
  .main-footer-box {
    padding: 20px 0;
    font-size: 10px;
    text-align: center;
    color: #0a419b;
    p + p {
      margin-top: 5px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .main-footer-component {
    .main-footer-box {
      margin: 0 10px;
    }
  }
}
</style>
