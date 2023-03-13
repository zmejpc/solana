<template>
	<div class="search">
		<input @keydown="search" type="text" name="search" class="form-control" placeholder="Search" autocomplete="off">
		<div class="search__results px-2 pb-2">
			<div :key="item.symbol" v-for="item in results" class="row mt-2">
				<div class="col-4">
					<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}">
						<video v-if="useIsVideo(item.image)" autoplay muted loop class="w-100">
							<source :src="item.image" type="video/mp4">
						</video>
						<img v-else :src="item.image" :alt="item.name" class="img-fluid">
					</router-link>
				</div>
				<div class="col-8">
					<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}">
						{{ item.name }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useIsVideo } from '@/services/composables'
import { useMainStore } from '@/stores/main'
import { ref } from 'vue'

const store = useMainStore()

const max_results = 10

let results = ref([])


async function search(e) {
	if (e.keyCode == 13) {

		let tmpResults = []
		let index = 0

		if (!store.collections.length) {
			await store.loadCollections()
		}

		while(store.collections[index] && tmpResults.length <= max_results) {

			if (store.collections[index].name.match(new RegExp(e.target.value, 'i'))) {
				tmpResults.push(store.collections[index])
			}

			index++
		}

		results.value = tmpResults

		document.addEventListener('click', (e) => {
			if (!e.target.closest('.search__results') || e.target.tagName == 'A') {
				results.value = []
			}
		}, {once: true})

	} else if(e.keyCode == 27) {
		results.value = []
	}
}

</script>

<style lang="scss" scoped>
.search {
	max-width: 200px;
	position: relative;

	&__results {
		position: absolute;
		background: #000;
		z-index: 1;
		font-size: 13px;
	}

	a {
		color: $light-blue;
	}
}
[name="search"] {
	border-radius: 10px;
	border-color: $light-blue;
	background-color: #000;
	color: #fff;

	&:focus, &:disabled {
		border-color: $light-blue;
		background-color: #000;
		color: #fff;
	}
}
</style>