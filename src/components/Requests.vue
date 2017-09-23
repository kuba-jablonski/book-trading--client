<template>
  <h3>Request component</h3>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('fetchRequests')
  }
}
</script>
