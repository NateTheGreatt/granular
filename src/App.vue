<template>
  <button @click='undo'>Undo</button>
  <button @click='redo'>Redo</button>
	<div id="app">
    <nest :id='scope'></nest>
  </div>
</template>

<script>
import Nest from './components/Nest.vue';
import store from './vuex/store';
import { HISTORY_STORAGE_KEY } from './vuex/store';

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
  methods: {
    undo () {
      var history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
      console.log(history);
      if(history.length >= 1) {
        console.log('undoing')
        // pop current state off (add to redo stack?)
        history.pop();
        // get last state
        var lastState = history[history.length-1];
        if(lastState) {
          console.log(lastState);
          store.replaceState(lastState);
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
        }
      }
    },
    redo () {

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
  font-family: 'Consolas';
  font-size: 10px;
}

button {
   /*border-radius: 10px;*/
   border-width: 1px;
   font-family: 'Consolas';
   font-size: 10px;
   padding: 0 2px;
   outline-width: 0;
}

body {

}

#app {

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
