<template>
	<div class="container">
		<h2>{{ collectionName || symbol }}</h2>
		<div class="mb-4">
			<VueChart :chartData="chartData" />
		</div>
	</div>
	<div class="stat-bg py-3 mb-5">
		<div class="container">
			<Stat :statData="statData" />
		</div>
	</div>
	<div class="container">
		<div class="font-12">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<div class="nav-link active" aria-current="page" @click="setActive(TSActiveListings)">
						TS Active Listings
					</div>
				</li>
				<li class="nav-item">
					<div class="nav-link" @click="setActive(TensorSwapActiveOrders)">
						TensorSwap Active Orders
					</div>
				</li>
			</ul>
			<KeepAlive>
				<component :is="activeComponent" :statData="statData"></component>
			</KeepAlive>
		</div>
	</div>
</template>

<script setup>
import TensorSwapActiveOrders from '../components/TensorSwapActiveOrders.vue'
import { ref, shallowRef, markRaw, watch, onMounted, defineProps } from 'vue'
import TSActiveListings from '../components/TSActiveListings.vue'
import Activities from '../components/Activities.vue'
import VueChart from '../components/VueChart.vue'
import Stat from '../components/Stat.vue'
import Tensor from '../services/tensor'
import fetch from 'cross-fetch'

const props = defineProps(['symbol', 'collectionName'])
const tensor = new Tensor

let chartData = ref([])

let statData = ref([])

let activeComponent = ref(markRaw(TSActiveListings))

onMounted(getData)

watch(() => props.symbol, getData);

function setActive(activeComponent) {
	activeComponent.value = markRaw(activeComponent)
	console.log(activeComponent.value)
}

async function getData() {

	statData.value = await tensor.getCollectionStat(props.symbol)
	chartData.value = await tensor.getCollectionChartData(statData.value.slug)
}

</script>

<style lang="scss" scoped>

.stat-bg {
	background-color: $black;
}
</style>