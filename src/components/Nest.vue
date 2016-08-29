<template>
   <div class='nest'>
      <div class='button-group'>
         <scope-to v-if='nest.id != scope' :id='nest.id'></scope-to>
         <step-out v-if='nest.id == scope && nest.parent' :id='nest.parent'></step-out>
         <embed-nest v-if='!nest.parent' :id='nest.id'></embed-nest><br />
         <add :id='nest.id'></add>
         <remove v-if='nest.parent != null' :id='nest.id'></remove>
      </div>
      <div style='position:absolute;margin: -16px 0 0 0;'>{{nest.id}}</div>
      <input @change='updateName(nest.id,nest.name)' v-model='nest.name' type='text' placeholder='Name' /> <br />
      <input @change='updateText(nest.id,nest.text)' v-model='nest.text' type='text' placeholder='Text' /> <br />

      <ul id='{{nest.id}}' v-sortable='sortableOptions'>
         <li v-for='childId in nest.children' id='{{childId}}'><nest :id='childId'></nest></li>
      </ul>
   </div>
</template>

<script>
   import ScopeTo from './ScopeTo';
   import StepOut from './StepOut';
   import EmbedNest from './EmbedNest';
   import Add from './Add';
   import Remove from './Remove';

   export default {
      name: 'nest',
      props: ['id'],
      components: {
         ScopeTo,
         StepOut,
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
            nests: state => state.nests,
            scope: state => state.scope
         },
         actions: {
            move: ({dispatch},nestId,newParentId) => {
               dispatch('MOVE',nestId,newParentId)
            },
            updateName: ({dispatch},nestId,name) => {
               dispatch('EDIT_NAME',nestId,name)
            },
            updateText: ({dispatch},nestId,text) => {
               dispatch('EDIT_TEXT',nestId,text)
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

input {
   font-family: 'Consolas';
   font-size: 10px;
   border: 0;
}

.button-group {
   position: relative;
   float: right;
}

.button-group button {
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
