<template>
	<div>
		<img :src="LoaderIcon" alt="Loading..." class="loader-icon">
	</div>
</template>

<script setup>
import LoaderIcon from '@/assets/svg/loader.svg'
	
</script>

<style scoped>
	.loader-icon {
		width: 100px;
		max-width: 50%;
		display: block;
		margin: 1rem auto;
	}
</style>