<template>
	<div v-if="orders.length">
		<div :key="item.address" v-for="item in orders">
			<div class="row mb-3">

				<div class="col-2 d-flex align-items-center" title="pairType">
					<Popper hover>
						{{ item.pairType }}
						<span class="text-primary">?</span>
						<template #content>
							<div v-html="useBuildPopperContent(item)"></div>
						</template>
					</Popper>
				</div>

				<div class="col-3 d-flex align-items-center">
					{{ useBuidDateString(item.createdAt) }}
				</div>

				<div class="col-5 d-flex align-items-center">
					<div class="text-overflow" title="Address">
						<a :href="`https://solscan.io/token/${item.address}`" target="_blank">
							{{ item.address }}
						</a>
					</div>
				</div>

				<div class="col-2 d-flex align-items-center" title="NFTs for sale">
					{{ item.boxes.length }}
				</div>

			</div>
		</div>
	</div>
	<div v-else>
		<Loader />
	</div>
</template>

<script setup>
import { useBuidDateString, useBuildPopperContent } from '@/services/composables'
import { defineProps, onMounted, ref } from 'vue'
import Loader from '../components/Loader.vue'
import Tensor from '../services/tensor'
import Popper from "vue3-popper"

const tensor = new Tensor

const props = defineProps(['statData']);

let orders = ref([])

onMounted(loadOrders);

async function loadOrders() {

	orders.value = await tensor.getHSActiveOrders(props.statData.slug)
}

</script>