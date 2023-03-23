<template>
	dgdfgdfg
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { BIconCartCheck } from 'bootstrap-icons-vue'
import SolanaIcon from '@/assets/svg/solana.svg'
import Tensor from '../services/tensor'

const tensor = new Tensor

const props = defineProps(['statData']);

let listings = ref([])

watch(() => props.statData, loadListings);

onMounted(loadListings)

async function loadListings() {
	const _listings = await tensor.getCollectionListings(props.statData.slug)

	listings.value = await Promise.all(_listings.map(async listing => {
		await fetch(`https://public-api.solscan.io/token/meta?tokenAddress=${listing.mint.onchainId}`, {headers: {
			token: process.env.VUE_APP_SOLSCAN_KEY
		}})
		.then(r => r.json())
		.then(data => listing.name = data.name)

		return listing
	}))
}

</script>

<style scoped>
	button:disabled {
		border: none;
	}
</style>