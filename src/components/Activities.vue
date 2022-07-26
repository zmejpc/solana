<template>
	<div v-if="activities" class="my-3">
		<div :key="item.symbol" v-for="item in activities">
			<div class="row my-2">

				<div class="col-2">
					<div v-if="item.image">
						<video v-if="isVideo(item.image)" autoplay muted loop class="w-100">
							<source :src="item.image" type="video/mp4">
						</video>
						<img v-else :src="item.image" :alt="item.name" class="img-fluid">
					</div>
				</div>

				<div class="col-2 d-flex align-items-center text-center">
					{{ new Date(item.blockTime * 1000).toLocaleDateString() }}<br>
					{{ new Date(item.blockTime * 1000).toLocaleTimeString() }}
				</div>

				<div class="col-2">{{ item.price }}</div>

				<div class="col-6 d-flex align-items-center">
					<div class="text-overflow">{{ item.seller }}</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Activities',
	data() {
		return {
			page: 1,
			perPage: 5
		}
	},
	computed: {
		activities() {
			return this.$store.state.collectionActivities
		}
	},
	created() {
		this.$store.dispatch('getCollectionActivities', this.$route.params.symbol)
	},
	methods: {
		isVideo(src) {
			return src.match(/\.mp4/)
		}
	}
};
</script>