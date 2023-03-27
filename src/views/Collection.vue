<template>
	<div class="container">
		<h2>{{ collectionName || symbol }}</h2>
		<div class="mb-4">
			<VueChart :chartData="chartData" />
		</div>
	</div>
	<div class="bg-black py-3 mb-5">
		<div class="container">
			<Stat :statData="statData" />
		</div>
	</div>
	<div class="container">
		<div class="font-12">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<div class="nav-link" :class="{active: activeComponent == TSActiveListings}" aria-current="page" @click="setActive(TSActiveListings)">
						TS Active Listings
					</div>
				</li>
				<li class="nav-item">
					<div class="nav-link" :class="{active: activeComponent == TSActiveOrders}" @click="setActive(TSActiveOrders)">
						TS Active Orders
					</div>
				</li>
				<li class="nav-item">
					<div class="nav-link" :class="{active: activeComponent == HSActiveOrders}" @click="setActive(HSActiveOrders)">
						HS Active Orders
					</div>
				</li>
			</ul>
			<div class="px-3 py-3 bg-black">
				<KeepAlive>
					<component :is="activeComponent" :statData="statData"></component>
				</KeepAlive>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, shallowRef, watch, onMounted, defineProps } from 'vue'
import TSActiveListings from '../components/TSActiveListings.vue'
import TSActiveOrders from '../components/TSActiveOrders.vue'
import HSActiveOrders from '../components/HSActiveOrders.vue'
import Activities from '../components/Activities.vue'
import VueChart from '../components/VueChart.vue'
import Stat from '../components/Stat.vue'
import Tensor from '../services/tensor'
import fetch from 'cross-fetch'

const props = defineProps(['symbol', 'collectionName'])
const tensor = new Tensor

let chartData = ref([])

let statData = ref([])

let activeComponent = shallowRef(TSActiveListings)

onMounted(getData)

watch(() => props.symbol, getData);

function setActive(active) {
	activeComponent.value = active
}

async function getData() {

	statData.value = await tensor.getCollectionStat(props.symbol)
	chartData.value = await tensor.getCollectionChartData(statData.value.slug)
}

</script>

<style scoped>
	.nav-link:not(.active) {
		cursor: pointer;
	}
</style>