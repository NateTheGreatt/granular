<template>
	<button @click='embed(this.id)'>Embed</button>
</template>

<script>
import { embed } from '../vuex/actions';
export default {
	props: ['id'],
	vuex: {
		actions: {
			embed
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>