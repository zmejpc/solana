<template>
	<div v-if="statData" class="row">
		<div class="col-6">
			<div class="block h-100">
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-success mr-2">Symbol</span>
					</div>
					<div class="col-8">{{ statData.symbol }}</div>
				</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-primary mr-2">Listed</span>
					</div>
					<div class="col-8">{{ statData.listedCount }}</div>
				</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-danger mr-2">Floor price</span>
					</div>
					<div v-if="statData.floorPrice" class="col-8">{{ statData.floorPrice }} ◎</div>
					<div v-else class="col-8">N/A</div>
				</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-warning mr-2">Total volume</span>
					</div>
					<div v-if="statData.volumeAll" class="col-8">{{ statData.volumeAll }} ◎</div>
					<div v-else class="col-8">N/A</div>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="block">
				<div class="block__title">24 hours</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-primary mr-2">Listed</span>
					</div>
					<div class="col-8">{{ dayListed }}</div>
				</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-danger mr-2">Floor price</span>
					</div>
					<div v-if="dayFloorPrice" class="col-8">{{ dayFloorPrice }} ◎</div>
					<div v-else class="col-8">N/A</div>
				</div>
				<div class="row mb-2">
					<div class="col-4">
						<span class="badge badge-warning mr-2">Total volume</span>
					</div>
					<div v-if="dayVolume" class="col-8">{{ dayVolume }} ◎</div>
					<div v-else class="col-8">N/A</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Stat',
	data() {
		return {
			dayFloorPrice: null,
			dayListed: 0,
			dayVolume: 0
		}
	},
	computed: {
		statData() {
			return this.$store.state.statData
		},
		chartData() {
			return this.$store.state.chartData
		}
	},
	created() {
		this.$store.dispatch('getStatData', this.$route.params.symbol)
	},
	mounted() {
		this.$store.subscribe(mutation => {
			if (mutation.type === 'setChartData') {

				this.setDayData()
			}
		})
	},
	methods: {
		isVideo(src) {
			return src.match(/\.mp4/)
		},
		setDayData() {
			const date = new Date()
			const startTime = date.setDate(date.getDate() - 1)

			let floorPrice

			this.chartData.forEach(el => {
				let time = el.blockTime * 1000

				if (time < startTime) {
					return
				}

				switch (el.type) {
					case 'list':
						this.dayListed++

						if (!floorPrice) {
							floorPrice = el.price
						}

						floorPrice = Math.min(floorPrice, el.price)
					break;
					case 'buyNow':
						this.dayVolume += el.price
					break;
				}
			})

			this.dayFloorPrice = floorPrice
		}
	}
};
</script>