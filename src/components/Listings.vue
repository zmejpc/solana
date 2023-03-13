<template>
	<div v-if="listings" class="my-3">
		<div :key="item.symbol" v-for="item in listings">
			<div class="row my-2">

				<div class="col-2">
					<video v-if="useIsVideo(item.extra.img)" autoplay muted loop class="w-100">
						<source :src="item.extra.img" type="video/mp4">
					</video>
					<img v-else :src="item.extra.img" :alt="item.name" class="img-fluid">
				</div>

				<div class="col-3 d-flex align-items-center">{{ item.price }} ◎</div>

				<div class="col-2 d-flex align-items-center text-center" v-if="item.blockTime">
					{{ new Date(item.blockTime * 1000).toLocaleDateString() }}<br>
					{{ new Date(item.blockTime * 1000).toLocaleTimeString() }}
				</div>
				<div class="col-2 d-flex align-items-center" v-else>N/A</div>

				<div class="col-3 d-flex align-items-center">
					<div class="text-overflow" title="Seller">{{ item.seller }}</div>
				</div>

				<div class="col-2 d-flex align-items-center">
					<button type="button" class="btn btn default icon-btn" title="Buy">
						<BIconCartCheck />
					</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>
import { BIconCartCheck } from 'bootstrap-icons-vue'
import { useIsVideo } from '@/services/composables'
import { defineProps } from 'vue'

const props = defineProps(['listings']);

</script>