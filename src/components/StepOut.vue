<template>
	<button @click='scopeTo(this.id)'>Step Out</button>
</template>

<script>
	import { scopeTo } from '../vuex/actions';
	export default {
		props: ['id'],
		vuex: {
			actions: {
				scopeTo
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
