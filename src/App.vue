<template>
  <div id="app">
  	<tab v-show="$route.meta.navShow"></tab>
    <router-view/>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab';
export default {
  components:{
  	Tab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 10px;
}
</style>
