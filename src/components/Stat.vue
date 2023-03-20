<template>
	<div v-if="statData" class="row">
		<div class="col-6">
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Symbol</span>
				</div>
				<div class="col-8">{{ statData.symbol }}</div>
			</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Listed</span>
				</div>
				<div class="col-8">{{ statData.listedCount }}</div>
			</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Floor price</span>
				</div>
				<div v-if="statData.floorPrice" class="col-8">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">
					{{ (statData.floorPrice / 1000000000).toFixed(2) }}
				</div>
				<div v-else class="col-8">N/A</div>
			</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Total volume</span>
				</div>
				<div v-if="statData.volumeAll" class="col-8">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">
					{{ (statData.volumeAll / 1000000000).toFixed(2) }}
				</div>
				<div v-else class="col-8">N/A</div>
			</div>
		</div>
		<div class="col-6">
			<div class="mb-2">24 hours</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Listed</span>
				</div>
				<div class="col-8">{{ dayListed }}</div>
			</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Floor price</span>
				</div>
				<div v-if="dayFloorPrice" class="col-8">{{ dayFloorPrice }} ◎</div>
				<div v-else class="col-8">N/A</div>
			</div>
			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Total volume</span>
				</div>
				<div v-if="dayVolume" class="col-8">{{ dayVolume.toFixed(1) }} ◎</div>
				<div v-else class="col-8">N/A</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import SolanaIcon from '@/assets/svg/solana.svg'
import { ref, watch, defineProps } from 'vue'

const props = defineProps(['statData', 'chartData'])

let dayFloorPrice = ref(null)

let dayListed = ref(0)

let dayVolume = ref(0)

watch(() => props.chartData, setDayData)

function setDayData() {
	const date = new Date()
	const startTime = date.setDate(date.getDate() - 1)

	let tmpFloorPrice = 0
	let tmpDayListed = 0
	let tmpDayVolume = 0

	props.chartData.forEach(el => {
		let time = el.blockTime * 1000

		if (time < startTime) {
			return
		}

		switch (el.type) {
			case 'list':
				tmpDayListed++

				if (!tmpFloorPrice) {
					tmpFloorPrice = el.price
				}

				tmpFloorPrice = Math.min(tmpFloorPrice, el.price)
			break;
			case 'buyNow':
				tmpDayVolume += el.price
			break;
		}
	})

	dayFloorPrice.value = tmpFloorPrice
	dayListed.value = tmpDayListed
	dayVolume.value = tmpDayVolume
}

</script>