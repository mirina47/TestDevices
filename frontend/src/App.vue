<template>
  <div id="app">
    <navbar/>
    <ListDevices/>
  </div>
</template>

<script>
    import Navbar from './components/Navbar';
    import ListDevices from './components/ListDevices.vue';

    export default {
        name: 'App',
        components: {
            Navbar: Navbar,
            ListDevices: ListDevices
        }
    }
</script>

<!--определение стилей-->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin-top: 20px;
  }
</style>