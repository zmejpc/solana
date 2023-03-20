import axios from 'axios'

export default class Magiceden {

	getHost() {
		return process.env.NODE_ENV === 'production' ? '/api' : 'https://api-mainnet.magiceden.dev/v2'
	}

	async getTopCollections() {

		const url = process.env.NODE_ENV === 'production' ? '/top' : 'https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=12&window=1d'

		const config = {
			method: 'get',
			url: `${url}`,
			headers: { }
		};

		return await axios(config)
	}

	async getCollections(offset, limit) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections?offset=${offset}&limit=${limit}`,
			headers: {'ME-Pub-API-Metadata': '{"paging":true}'}
		};

		return await axios(config)
	}

	async getCollectionListings(symbol, offset, limit) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections/${symbol}/listings?offset=${offset}&limit=${limit}`,
			headers: { }
		};

		return await axios(config)
	}

	async getCollectionActivities(symbol, offset, limit) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections/${symbol}/activities?offset=${offset}&limit=${limit}`,
			headers: { }
		};

		return await axios(config)
	}

	async getCollectionStat(symbol) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections/${symbol}/stats`,
			headers: { }
		};

		return await axios(config)
	}

	async getTokenListings(tokenMint) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/tokens/${tokenMint}/activities?offset=0&limit=200`,
			headers: { }
		};

		return await axios(config)
	}

	async getToken(tokenMint) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/tokens/${tokenMint}`,
			headers: { }
		};

		return await axios(config)
	}
}

