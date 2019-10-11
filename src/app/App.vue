<template>
  <div class="jumbotron d-flex flex-column justify-content-center align-items-center h-100">
    <div class="container">
      <div class="row">
        <div class="col col-xs-6 col-md-4 offset-xs-3 offset-md-4">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    alert() {
      return this.$store.state.alert;
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.$store.dispatch("alert/clear");
    }
  }
};
</script>