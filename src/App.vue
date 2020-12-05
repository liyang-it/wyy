<template>
<!-- :style="{'height': '100%','background-color':color}" -->
  <div id="app" >
    <!-- <img src="./assets/logo.png"> -->
       <router-view />
  </div>

</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  created () {
  }

}
</script>

<style>
/**:-moz-any(
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

) */
.iconsvg {
width: 1.5rem;
height: 1.5rem;
vertical-align: -0.15em;
fill: currentColor;
overflow: hidden;
}
</style>
