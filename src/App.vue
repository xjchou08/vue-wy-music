<template>
	<div id="app">
		<nav-top />
		<div>
			<nav-lft />
		</div>
	</div>
</template>
<script>
    import NavTop from "@/components/NavTop.vue";
    import NavLft from "@/components/NavLeft.vue";

    export default {
        components: {NavTop, NavLft}
    }
</script>

<style lang="scss">
	body {
		margin: 0;
		padding: 0;
		box-sizing:content-box;
	}
</style>
