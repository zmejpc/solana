<template>
	<div v-if="listings.length">
		<div :key="item.mint.onchainId" v-for="item in listings">
			<div class="row mb-2">

				<div class="col-4 d-flex align-items-center">
					<Popper hover>
						{{ item.name }}
						<span class="text-primary">?</span>
						<template #content>
							<div v-html="useBuildPopperContent(item)"></div>
						</template>
					</Popper>
				</div>

				<div class="col-2 d-flex align-items-center">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">&nbsp;
					{{ (item.tx.grossAmount / 1000000000).toFixed(4) }}
				</div>

				<div class="col-5 d-flex align-items-center">
					<div class="text-overflow" title="Seller">
						<a :href="`https://solscan.io/token/${item.tx.sellerId}`" target="_blank">
							{{ item.tx.sellerId }}
						</a>
					</div>
				</div>

				<div class="col-1 d-flex align-items-center">
					<button type="button" class="btn btn default icon-btn" title="Buy" disabled>
						<BIconCartCheck />
					</button>
				</div>

			</div>

		</div>
	</div>
	<div v-else>
		<Loader />
	</div>
</template>

<script setup>
import { useBuildPopperContent } from '@/services/composables'
import { defineProps, onMounted, ref, watch } from 'vue'
import { BIconCartCheck } from 'bootstrap-icons-vue'
import SolanaIcon from '@/assets/svg/solana.svg'
import Loader from '../components/Loader.vue'
import Tensor from '../services/tensor'
import Popper from "vue3-popper"

const tensor = new Tensor

const props = defineProps(['statData']);

let listings = ref([])

watch(() => props.statData, loadListings);


async function loadListings() {
	const _listings = await tensor.getTSActiveListings(props.statData.slug)

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