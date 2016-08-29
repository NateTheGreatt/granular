<template>
	<button @click='add(this.id)'>Add</button>
</template>

<script>
	import { add } from '../vuex/actions';
	export default {
		props: ['id'],
		vuex: {
			actions: {
				add
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
