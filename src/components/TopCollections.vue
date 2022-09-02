<template>
	<h2 class="mb-4">Top collections</h2>
	<div v-if="collections">
		<div :key="item.symbol" v-for="item in collections" class="row my-2">
			<div class="col-1">
				<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}" title="Listings">
					<video v-if="isVideo(item.image)" autoplay muted loop class="w-100">
						<source :src="item.image" type="video/mp4">
					</video>
					<img v-else :src="item.image" :alt="item.name" class="img-fluid">
				</router-link>
			</div>
			<div class="col-2 d-flex align-items-center">{{ item.name }}</div>
			<div class="col-6 d-flex align-items-center">{{ item.floor || 'N/A' }}</div>
			<div class="col-3 d-flex align-items-center">
				<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}" title="Listings">
					<BIconListNested />
				</router-link>
			</div>
		</div>
	</div>
	<Pager @prev="prevPage" @next="nextPage" @perPage="setPerPage" :parent-per-page="perPage" :page="page" />
</template>

<script>
import { BIconListNested } from 'bootstrap-icons-vue'
import Magiceden from '../services/magiceden'
import Pager from './Pager'

export default {
	name: 'TopCollections',
	components: {
		BIconListNested,
		Pager
	},
	data() {
		return {
			page: 1,
			perPage: 10
		}
	},
	created() {
		this.getCollections()
	},
	computed: {
		collections() {
			return this.$store.state.topCollections
		}
	},
	methods: {
		isVideo(src) {
			return src.match(/\.mp4/)
		},
		getCollections() {
			this.$store.dispatch('getCollections', {
				block: 'top',
				offset: this.perPage * (this.page - 1),
				limit: this.perPage
			})
		},
		prevPage() {
			if (this.page > 1) {
				this.page--
				this.getCollections()
			}
		},
		nextPage() {
			this.page++
			this.getCollections()
		},
		setPerPage(perPage) {
			this.perPage = perPage
			this.getCollections()
		}
	}
};
</script>

<style>
	
</style>