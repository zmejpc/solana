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

async function getData() {
	magiceden.getCollectionActivities(props.symbol)
		.then(response => {

			chartData.value = response.data
			chart.value = new Chart(chartData.value)
			chart.value.init(document.getElementById('chart'))

			activities.value = response.data.filter(el => el.type == 'buyNow')
		})

	await magiceden.getCollectionListings(props.symbol)
		.then(async response => {
			listings.value = await Promise.all(response.data.map(async item => {
				await magiceden.getTokenListings(item.tokenMint).then(tokenResponse => {
					item.blockTime = (tokenResponse.data.find(el => el.type == 'list') || {}).blockTime
				})
				return item
			}))
		})

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