<template>
	<h2 class="mb-4">Top collections</h2>
	<div v-if="collections">
		<div :key="item.collectionSymbol" v-for="item in collections" class="row mb-5 mb-md-2 pb-2 border-bottom">

			<div class="col-md-1 col-12">
				<router-link :to="{name: 'Collection', params: {symbol: item.collectionSymbol, collectionName: item.name}}" title="Listings">
					<img :data-src="item.image" :alt="item.name" class="img-fluid lazyload">
				</router-link>
			</div>

			<div class="col-md-2 col-12 d-flex align-items-center">{{ item.name }}</div>

			<div v-if="item.fp" class="col-md-2 col-4 d-flex align-items-center">
				<small>Floor</small>:
				<img :src="SolanaIcon" alt="Sol" class="Va(sub) mx-2">
				{{ (item.fp / 1000000000).toFixed(2) }}
			</div>
			<div v-else class="col-md-2 col-4 d-flex align-items-center">N/A</div>

			<div v-if="item.vol" class="col-md-2 col-4 d-flex align-items-center">
				<small>Volume</small>:
				<img :src="SolanaIcon" alt="Sol" class="Va(sub) mx-2">
				{{ item.vol.toFixed(2) }}
			</div>
			<div v-else class="col-md-2 col-4 d-flex align-items-center">N/A</div>

			<div class="col-md-3 col-4 d-flex align-items-center">
				<router-link :to="{name: 'Collection', params: {symbol: item.collectionSymbol, collectionName: item.name}}" title="Listings" class="icon-btn">
					<BIconListNested />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
import { BIconListNested } from 'bootstrap-icons-vue'
import SolanaIcon from '@/assets/svg/solana.svg'
import Magiceden from '@/services/magiceden'
import { ref, onMounted } from 'vue'

const magiceden = new Magiceden

const config = {
	method: 'get',
	url: 'https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=12&window=1d',
	headers: { }
};

let collections = ref([])

onMounted(async function getData() {
	collections.value = await magiceden.getTopCollections().then(r => r.data)
});

</script>

<style lang="scss" scoped>
	.border-bottom {
		border-bottom-color: $dark-blue!important;
	}
</style>