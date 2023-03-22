<template>
	<div class="container">
		<h2>{{ collectionName || symbol }}</h2>
		<div class="mb-4" v-if="statData.listedCount">
			<VueChart :chartData="chartData" :listedCount="statData.listedCount" />
		</div>
	</div>
	<div class="stat-bg py-3 mb-5">
		<div class="container">
			<Stat :statData="statData" :chartData="chartData" />
		</div>
	</div>
	<div class="container">
		<div class="row font-12">
			<div class="col-6">
				<h4>Listings</h4>
				<div>
					<Listings :listings="listings" />
				</div>
			</div>
			<div class="col-6">
				<h4>Recently sales</h4>
				<div>
					<Activities :activities="activities" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import Activities from '../components/Activities.vue'
import VueChart from '../components/VueChart.vue'
import Listings from '../components/Listings.vue'
import Magiceden from '../services/magiceden'
import Stat from '../components/Stat.vue'

const props = defineProps(['symbol', 'collectionName'])
const magiceden = new Magiceden

let activities = ref([])

let chartData = ref([])

let listings = ref([])

let statData = ref([])

const lists_limit = 100

onMounted(getData)

watch(() => props.symbol, getData);

watch(() => chartData, () => {

	activities.value = chartData.value.filter(el => {
		return ['buyNow'].indexOf(el.type) > -1
	}).slice(0, lists_limit)

}, {deep: true});

async function loadActivities(page = 1, limit = 500) {

	if (page > 20) {
		return
	}

	magiceden.getCollectionActivities(props.symbol, limit * (page - 1), limit)
		.then(async response => {

			if (response.data.length) {

				chartData.value = chartData.value.concat(response.data.filter(el => {
					return ['buyNow', 'list', 'delist'].indexOf(el.type) > -1
				}))

				const date = new Date
				date.setHours(0, 0, 0, 0)

				if (response.data.slice(-1)[0].blockTime > date.valueOf() / 1000) {
					await loadActivities(page + 1)
				}
			}
		})
}

async function loadListings(page = 1, limit = 20) {

	if (page > 10) {
		return
	}

	magiceden.getCollectionListings(props.symbol, limit * (page - 1), limit)
		.then(async response => {

			if (response.data.length) {
				listings.value = listings.value.concat(response.data)

				if (listings.value.length > lists_limit) {
					listings.value = listings.value.slice(0, lists_limit)
				} else {
					await loadListings(page + 1)
				}
			}
		})
}

async function getData() {
	chartData.value = []
	activities.value = []

	await magiceden.getCollectionStat(props.symbol)
		.then(response => statData.value = response.data)

	await loadActivities()
	await loadListings()
}

</script>

<style lang="scss" scoped>

.stat-bg {
	background-color: $black;
}
</style>