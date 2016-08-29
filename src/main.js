import Vue from 'vue';
import Sortable from 'vue-sortable';
import App from './App';

Vue.use(Sortable);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
