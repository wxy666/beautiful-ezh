<template>
	
	<transition name="slideY">
		<div class="person">
			<div @click="back()"> goback</div>
			
		</div>
	</transition>
</template>

<script>
	export default{
		methods:{
			back() {
	        this.$router.back();
	      	},
		}
	}
</script>

<style scoped>

	.person{
		width: 100%;
		height: 90%;
		background: aqua;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 4;
	}
</style>