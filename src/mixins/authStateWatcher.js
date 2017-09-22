export default {
  computed: {
    auth () {
      return this.$store.getters.authenticated
    }
  },
  watch: {
    auth (val) {
      if (!val) this.$router.push('/')
    }
  }
}
