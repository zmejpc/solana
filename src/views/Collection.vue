<template>
	<div class="container">
		<h2>{{ collectionName || symbol }}</h2>
		<div class="mb-4">
			<div id="chart"></div>
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
				<div class="scrollable">
					<Listings :listings="listings" />
				</div>
			</div>
			<div class="col-6">
				<h4>Recently sales</h4>
				<div class="scrollable">
					<Activities :activities="activities" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue'
import Activities from '../components/Activities.vue'
import Listings from '../components/Listings.vue'
import Magiceden from '../services/magiceden'
import Stat from '../components/Stat.vue'
import Chart from '../services/chart'

const props = defineProps(['symbol', 'collectionName'])
const magiceden = new Magiceden

let chart = ref(Object)

let activities = ref([])

let chartData = ref([])

let listings = ref([])

let statData = ref([])

onMounted(getData)

watch(() => props.symbol, getData);

watch(() => chartData.value, () => {
	chart.value = new Chart(chartData.value)
	chart.value.init(document.getElementById('chart'))

	activities.value = chartData.value.filter(el => {
		return ['buyNow'].indexOf(el.type) > -1
	})
});

async function loadActivities(page = 1, limit = 500) {

	if (page > 40) {
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

				if (response.data.slice(response.data.length - 1)[0].blockTime > date.valueOf() / 1000) {
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
				await loadListings(page + 1)
			}
		})
}

async function getData() {

	await loadActivities()
	await loadListings()

	magiceden.getCollectionStat(props.symbol)
		.then(response => statData.value = response.data)
}

</script>

<style lang="scss" scoped>
#chart {
	height: 400px;
}

.scrollable {
	max-height: 400px;
	overflow-y: scroll;
	overflow-x: hidden;
}

.stat-bg {
	background-color: $black;
}
</style>