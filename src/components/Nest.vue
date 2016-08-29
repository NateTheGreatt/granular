<template>
   <div class='nest'>
      <div class='button-group'>
         <scope-to v-if='!nest.scoped' :id='nest.id'></scope-to>
         <embed-nest :id='nest.id'></embed-nest><br />
         <add :id='nest.id'></add>
         <remove v-if='nest.parent != null' :id='nest.id'></remove>
      </div>
      id: {{ nest.id }} <br />
      name: {{ nest.name }} <br />
      text: {{ nest.text }} <br />

      <ul id='{{nest.id}}' v-sortable='sortableOptions'>
         <li v-for='childId in nest.children' id='{{childId}}'><nest :id='childId'></nest></li>
      </ul>
   </div>
</template>

<script>
   import ScopeTo from './ScopeTo';
   import EmbedNest from './EmbedNest';
   import Add from './Add';
   import Remove from './Remove';

   export default {
      name: 'nest',
      props: ['id'],
      components: {
         ScopeTo,
         EmbedNest,
         Add,
         Remove
      },
      data () {
         var self = this;
         return {
            sortableOptions: {
               group: 'group', 
               animation: 150,
               onAdd (e) {
                  self.move(e.item.id,e.to.id);
                  console.log(e.item.id + '\'s parent is now '+e.to.id);
               }
            }
         }
      },
      vuex: {
         getters: {
            nests: state => state.nests
         },
         actions: {
            move: ({dispatch},nestId,newParentId) => {
               dispatch('MOVE',nestId,newParentId)
            }
         }
      },
      computed: {
         nest: {
            get() {
               return this.nests.find(n=>n.id==this.id);
            }
         }
      }
   };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
   color: #42b983;
}

.nest {
   border: 1px solid #aaa;
   border-radius: 10px;
   padding: 5px;
   margin: 10px;
   height: 100%;
   font-family: 'Consolas';
   font-size: 10px;
}

.button-group {
   position: relative;
   float: right;
}

.button-group button {
   border-radius: 10px;
   border-width: 1px;
   font-family: 'Consolas';
   font-size: 10px;
   padding: 0 2px;
   outline-width: 0;
}

ul {
   min-width: 100px;
   min-height: 100px;
}

ul li {
   display: inline-block;

   list-style: none;
}
</style>
