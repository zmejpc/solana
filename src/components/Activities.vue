<template>
	<div v-if="activities" class="my-3">
		<div :key="item.symbol" v-for="item in activities">
			<div class="row my-2">

				<div class="col-2">
					<div v-if="item.image">
						<video v-if="useIsVideo(item.image)" autoplay muted loop class="w-100">
							<source :src="item.image" type="video/mp4">
						</video>
						<img v-else :src="item.image" :alt="item.name" class="img-fluid">
					</div>
				</div>

				<div class="col-2 d-flex align-items-center text-center">
					{{ new Date(item.blockTime * 1000).toLocaleDateString() }}<br>
					{{ new Date(item.blockTime * 1000).toLocaleTimeString() }}
				</div>

				<div v-if="item.price" class="col-3 d-flex align-items-center">{{ item.price }} ◎</div>
				<div v-else class="col-3 d-flex align-items-center">N/A</div>

				<div class="col-5 d-flex align-items-center">
					<div class="text-overflow" title="Seller">{{ item.seller }}</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { useIsVideo } from '@/services/composables'
import { defineProps } from 'vue'

const props = defineProps(['activities']);

</script>