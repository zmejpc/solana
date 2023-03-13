import Magiceden from '../services/magiceden'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const magiceden = new Magiceden

export const useMainStore = defineStore('main', () => {

	let collections = ref([])

	async function loadCollections(page = 1) {
		const limit = 200;

		await magiceden.getCollections(limit * (page - 1), limit)
			.then(async response => {

				collections.value = collections.value.concat(response.data.filter(item => item.symbol))

				// collections.value = await Promise.all(data.map(async item => {
				// 	await magiceden.getCollectionStat(item.symbol)
				// 		.then(statResponse => item.floor = statResponse.data.floorPrice)
				// 	return item
				// }))

				if (response.data.length && page < 15) {
					loadCollections(page + 1)
					page++
				}
			})
	}

	

	return {
		collections,
		loadCollections,
	}
})