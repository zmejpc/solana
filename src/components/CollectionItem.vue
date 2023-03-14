<template>
	<div class="row mb-5 mb-md-2 pb-2 border-bottom">
		<div class="col-md-1 col-12">
			<router-link :to="{name: 'Collection', params: {symbol: collection.symbol, collectionName: collection.name}}" title="Listings">
				<video v-if="useIsVideo(collection.image)" autoplay muted loop class="w-100">
					<source :src="collection.image" type="video/mp4">
				</video>
				<img v-else :data-src="collection.image" :alt="collection.name" class="img-fluid lazyload">
			</router-link>
		</div>
		<div class="col-md-2 col-12 d-flex align-items-center">{{ collection.name }}</div>
		<div class="col-6 d-flex align-items-center">{{ collection.floor ? collection.floor + ' ◎' : 'N/A' }}</div>
		<div class="col-3 d-flex align-items-center">
			<router-link :to="{name: 'Collection', params: {symbol: collection.symbol, collectionName: collection.name}}" title="Listings" class="icon-btn">
				<BIconListNested />
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { BIconListNested } from 'bootstrap-icons-vue'
import { useIsVideo } from '@/services/composables'
import { defineProps } from 'vue'

const props = defineProps(['collection']);

</script>

<style lang="scss" scoped>
	.border-bottom {
		border-bottom-color: $dark-blue!important;
	}
</style>