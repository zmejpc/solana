<template>
	<h2 class="mb-4" id="latest-collections">Latest collections</h2>
	<div v-if="collections">
		<div :key="item.symbol" v-for="item in collections">
			<CollectionItem :collection="item" />
		</div>
	</div>
	<Pager @prev="prevPage" @next="nextPage" :page="page" />
</template>

<script setup>
import CollectionItem from './CollectionItem'
import { useMainStore } from '@/stores/main'
import Pager from './Pager'
import { ref } from 'vue'

const store = useMainStore()

let collections = ref([])

const perPage = 20

let page = ref(1)

store.$subscribe(getCollections)

function getCollections() {
	const start = perPage * (page.value - 1)
	collections.value = store.collections.slice(start, start + perPage)
}

function prevPage() {
	if (page.value > 1) {
		page.value--
		getCollections()
		scroll()
	}
}

function nextPage() {
	page.value++
	getCollections()
	scroll()
}

function scroll() {
	const block = document.getElementById('latest-collections')
	window.scrollTo(0,block.offsetTop)
}
</script>

<style>
	
</style>