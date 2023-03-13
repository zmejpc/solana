<template>
	<div class="d-flex my-4">
		<button @click="$emit('prev')" :disabled="page < 2" class="btn btn-primary btn-sm me-2">
			<BIconCaretLeft />
			<span>Prev</span>
		</button>
		<button @click="$emit('next')" class="btn btn-primary btn-sm">
			<span>Next</span>
			<BIconCaretRight />
		</button>
	</div>
</template>

<script setup>
import { BIconCaretLeft, BIconCaretRight } from 'bootstrap-icons-vue'
import { defineProps } from 'vue'

const props = defineProps(['page']);

</script>

<style scoped>
svg {
	margin-bottom: 3px;
}
</style>