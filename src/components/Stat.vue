<template>
	<div class="row" v-if="props.statData.statsOverall">
		<div class="col-sm-12 col-md-4">

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Symbol</span>
				</div>
				<div class="col-8">{{ statData.slugDisplay }}</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Listed</span>
				</div>
				<div class="col-8">{{ props.statData.statsOverall.numListed }}</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Floor price</span>
				</div>
				<div class="col-8">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">
					{{ (props.statData.statsOverall.floorPrice / 1000000000).toFixed(2) }}
				</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-success mr-2">Minted</span>
				</div>
				<div class="col-8">
					{{ props.statData.statsOverall.numMints }}
				</div>
			</div>

		</div>
		<div class="col-sm-12 col-md-4">

			<div class="row mb-2">
				<div class="col">1 hour</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-danger mr-2">Sales</span>
				</div>
				<div class="col-8">{{ props.statData.statsOverall.sales1h }}</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-danger mr-2">Floor price</span>
				</div>
				<div class="col-8">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">
					{{ props.statData.statsOverall.floor1h.toFixed(4) }}
				</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-danger mr-2">Volume</span>
				</div>
				<div class="col-8">
					{{ (props.statData.statsOverall.volume1h / 1000000000).toFixed(2) }}
				</div>
			</div>

		</div>
		<div class="col-sm-12 col-md-4">

			<div class="row mb-2">
				<div class="col">24 hours</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Sales</span>
				</div>
				<div class="col-8">{{ props.statData.statsOverall.sales24h }}</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Floor price</span>
				</div>
				<div class="col-8">
					<img :src="SolanaIcon" alt="Sol" class="Va(sub)">
					{{ props.statData.statsOverall.floor24h.toFixed(4) }}
				</div>
			</div>

			<div class="row mb-2">
				<div class="col-4">
					<span class="badge bg-warning mr-2">Volume</span>
				</div>
				<div class="col-8">
					{{ (props.statData.statsOverall.volume24h / 1000000000).toFixed(2) }}
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>
import SolanaIcon from '@/assets/svg/solana.svg'
import { defineProps } from 'vue'

const props = defineProps(['statData']);

</script>