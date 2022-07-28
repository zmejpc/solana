<template>
	<div class="container">
		<div class="mb-4">
			<div id="chart"></div>
		</div>
		<div class="mb-5">
			<Stat />
		</div>
		<div class="row font-12">
			<div class="col-6">
				<h4>Listings</h4>
				<Listings />
			</div>
			<div class="col-6">
				<h4>Recently sales</h4>
				<Activities />
			</div>
		</div>
	</div>
</template>

<script>
import Activities from '../components/Activities.vue'
import Listings from '../components/Listings.vue'
import Stat from '../components/Stat.vue'
import Chart from '../services/chart'

export default {
	name: 'Collection',
	components: {
		Activities,
		Listings,
		Stat
	},
	data() {
		return {
			chart: Object
		}
	},
	mounted() {
		this.$store.subscribe(mutation => {
			if (mutation.type === 'setChartData') {
				this.chart = new Chart(this.$store.state.chartData)
				const chartDom = document.getElementById('chart')
				this.chart.init(chartDom)
			}
		})
	}
};
</script>

<style scoped>
#chart {
	height: 400px;
}
</style>