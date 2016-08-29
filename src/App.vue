<template>
	<div id="app">
    <nest :id='scope'></nest>
  </div>
</template>

<script>
import Nest from './components/Nest.vue';
import store from './vuex/store';

export default {
  components: {
    Nest
  },
  vuex: {
    getters: {
      scope: state => state.scope,
      nests: state => state.nests
    }
  },
  store
};
</script>

<style>
* {
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

html {
  height: 100%;
}

body {

/*
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;*/
}

#app {
  /*height: 700px;*/

/*
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;*/
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
