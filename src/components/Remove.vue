<template>
	<button @click='remove(this.id)'>Remove</button>
</template>

<script>
	import { remove } from '../vuex/actions';
	export default {
		props: ['id'],
		vuex: {
			actions: {
				remove
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
