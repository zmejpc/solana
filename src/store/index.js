import Magiceden from '../services/magiceden'

const debug = process.env.NODE_ENV !== 'production'
const magiceden = new Magiceden

export default {
  strict: debug,

  mutations: {
		setCollections(state, payload) {
			state[payload.block + 'Collections'] = payload.collections
		},

		setStatData(state, payload) {
			state.statData = payload.statData
		},

		setCollectionListings(state, payload) {
			state.collectionListings = payload.listings
		},

		setCollectionActivities(state, payload) {
			state.collectionActivities = payload.activities
		},

		setChartData(state, payload) {
			state.chartData = payload.chartData
		}
  },

  actions: {
		async getCollections({ dispatch, commit }, { block, offset, limit }) {

			await magiceden.getCollections(offset, limit)
				.then(response => dispatch('fillCollections', {
					block: block,
					data: response.data.filter(el => el.symbol)
				}))
		},

		async fillCollections({ commit }, {block, data}) {

			const collections = await Promise.all(data.map(async item => {
				await magiceden.getCollectionStat(item.symbol)
					.then(response => item.floor = response.data.floorPrice)
				return item
			}))

			commit('setCollections', {block: block, collections: collections})
		},

		getStatData({ commit }, symbol) {

			magiceden.getCollectionStat(symbol)
			.then(response => commit('setStatData', {statData: response.data}))
		},

		async getCollectionListings({ dispatch, commit }, symbol) {

			await magiceden.getCollectionListings(symbol)
				.then(response => dispatch('fillCollectionListings', response.data))
		},

		async fillCollectionListings({ commit }, data) {

			const listings = await Promise.all(data.map(async item => {
				await magiceden.getTokenListings(item.tokenMint).then(response => {
					item.blockTime = (response.data.find(el => el.type == 'list') || {}).blockTime
				})
				return item
			}))

			commit('setCollectionListings', {listings: listings})
		},

		getCollectionActivities({ commit }, symbol) {
			magiceden.getCollectionActivities(symbol)
				.then(response => {
					commit('setChartData', {chartData: response.data})
					return response.data.filter(el => el.type == 'buyNow')
				})
				.then(data => commit('setCollectionActivities', {activities: data}))
		}
  }
}