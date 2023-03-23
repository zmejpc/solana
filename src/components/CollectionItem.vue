<template>
	<div class="row mb-5 mb-md-2 pb-2 border-bottom">
		<div class="col-md-2 col-12 d-flex align-items-center">{{ collection.name }}</div>
		<div class="col-3 d-flex align-items-center">
			<router-link :to="{name: 'Collection', params: {symbol: collection.slugDisplay, collectionName: collection.name}}" title="Listings" class="icon-btn">
				<BIconListNested />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { BIconListNested } from 'bootstrap-icons-vue'
import { defineProps } from 'vue'

const props = defineProps(['collection']);

</script>

<style lang="scss" scoped>
	.border-bottom {
		border-bottom-color: $dark-blue!important;
	}
</style>