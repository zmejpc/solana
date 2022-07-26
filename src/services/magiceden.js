import axios from 'axios'

export default class Magiceden {

	getHost() {
		return process.env.NODE_ENV === 'production' ? '/api' : 'https://api-devnet.magiceden.dev/v2'
	}

	async getCollections(offset, limit) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections?offset=${offset}&limit=${limit}`,
			headers: {}
		};

		return await axios(config)
	}

	async getCollectionListings(symbol) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections/${symbol}/listings?offset=0&limit=20`,
			headers: { }
		};

		return await axios(config)
	}

	async getCollectionActivities(symbol) {

		const config = {
			method: 'get',
			url: `${this.getHost()}/collections/${symbol}/activities?offset=0&limit=1000`,
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
}

