import Tensor from '../services/tensor'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const tensor = new Tensor

export const useMainStore = defineStore('main', () => {

	let collections = ref([])

	async function loadCollections(page = 1) {

		collections.value = await tensor.getCollections(page)
	}

	return {
		collections,
		loadCollections,
	}
})