import { HttpLink, ApolloClient, InMemoryCache, gql } from '@apollo/client';
const { ApolloLink, concat } = require("apollo-link");
import fetch from 'cross-fetch';

export default class Tensor {

	client = {}

	api_key = process.env.NODE_ENV === 'production' ? 'fff' : 'a83de31c-6b68-46d7-a61d-d28154a190b3'

	uri = process.env.NODE_ENV === 'production' ? '/api' : 'https://api.tensor.so/graphql'

	constructor() {
		const authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
				headers: { "X-TENSOR-API-KEY": this.api_key}
			});
			
			return forward(operation);
		});

		const httpLink = new HttpLink({ uri: this.uri, fetch });

		this.client = new ApolloClient({
			link: concat(authLink, httpLink),
			cache: new InMemoryCache(),
			defaultOptions: {
				query: {
					fetchPolicy: "no-cache",
				},
			},
		});
	}

	async getCollections(page = 1, limit = 50) {

		const resp = await this.client.query({
			query: gql`
			  	query CollectionsStats(
				  $slugs: [String!],
				  $slugsMe: [String!],
					$slugsDisplay: [String!],
				  $ids: [String!],
				  $sortBy: String,
				  $page: Int,
				  $limit: Int, 
				) {
				  allCollections(
				    slugs: $slugs,
						slugsMe: $slugsMe,
						slugsDisplay: $slugsDisplay,  
				    ids: $ids,
				    sortBy: $sortBy,
				    page: $page,
				    limit: $limit
				  ) {
				    total
				    collections {
							id # Used to find corresponding whitelist PDA (uuid) if using SDK
				      slug # internal ID for collection (UUID or human-readable)
							slugMe # MagicEden's symbol
							slugDisplay # What's displayed in the URL on tensor.trade
				      statsOverall { # Across pools & marketplace listings
				        floor1h
				        floor24h
				        floor7d
				        floorPrice
				        numListed
				        numMints
				        priceUnit
				        sales1h
				        sales24h
				        sales7d
				        volume1h
				        volume24h
				        volume7d
				      }
							statsSwap { # TensorSwap + HadeSwap + Elixir
								buyNowPrice
								sellNowPrice
							}
				      statsTSwap { # TensorSwap only
				        buyNowPrice
				        nftsForSale
				        numMints
				        priceUnit
				        sales7d
				        sellNowPrice
				        solDeposited
				        volume7d
				      }
				      statsHSwap { # HadeSwap only
				        buyNowPrice
				        nftsForSale
				        priceUnit
				        sales7d
				        sellNowPrice
				        solDeposited
				        volume7d
				      }
				      tswapTVL
				      firstListDate
				      name
				    }
				  }
				}
			`,
			variables: {
				"slugs": null,
				"slugsMe": null,
				"slugsDisplay": null,
				"ids": null,
				"sortBy": "stats.volume24h:desc",
				"limit": limit,
				"page": page
			}
		})

		return resp.data.allCollections.collections
	}

	async getCollectionStat(slug) {
		const resp = await this.client.query({
			query: gql`
			  	query CollectionStats($slug: String!) {
				  instrumentTV2(slug: $slug) {
				    id # Used to find corresponding whitelist PDA (uuid) if using SDK
				    slug # internal ID for collection (UUID or human-readable)
				    slugMe # MagicEden's symbol
				    slugDisplay # What's displayed in the URL on tensor.trade
				    statsOverall { # Across pools & marketplace listings
				      floor1h
				      floor24h
				      floor7d
				      floorPrice
				      numListed
				      numMints
				      priceUnit
				      sales1h
				      sales24h
				      sales7d
				      volume1h
				      volume24h
				      volume7d
				    }
				    statsSwap { # TensorSwap + HadeSwap + Elixir
				      buyNowPrice
				      sellNowPrice
				    }
				    statsTSwap { # TensorSwap only
				      buyNowPrice
				      nftsForSale
				      numMints
				      priceUnit
				      sales7d
				      sellNowPrice
				      solDeposited
				      volume7d
				    }
				    statsHSwap { # HadeSwap only
				      buyNowPrice
				      nftsForSale
				      priceUnit
				      sales7d
				      sellNowPrice
				      solDeposited
				      volume7d
				    }
				    tswapTVL
				    firstListDate
				    name
				  }
				}
			`,
			variables: {
				slug: slug,
			}
		})

		return resp.data.instrumentTV2
	}

	async getTSActiveListings(slug) {
		const resp = await this.client.query({
			query: gql`
			  	query ActiveListings($slug: String!, $sortBy: ActiveListingsSortBy!, $filters: ActiveListingsFilters, $limit: Int, $cursor: ActiveListingsCursorInput) {
				  activeListings(slug: $slug, sortBy: $sortBy, filters: $filters, limit: $limit, cursor: $cursor) {
				    page {
				      endCursor {
				        txKey
				      }
				      hasMore
				    }
				    generatedFor
				    txs {
				      mint {
				        onchainId
				      }
				      tx {
				        sellerId
				        grossAmount
				        grossAmountUnit
				      }
				    }
				  }
				}
			`,
			variables: {
				slug: slug,
				sortBy: "PriceAsc",
				filters: {
					// sources: ["TENSORSWAP"]
				},
				limit: 50,
					// To get more results, pass `page.endCursor.txKey` from the response
				cursor: null 
			}
		})

		return resp.data.activeListings.txs
	}

	async getTSActiveOrders(slug) {
		const resp = await this.client.query({
			query: gql`
			  	query TensorSwapActiveOrders($slug: String!) {
				  tswapOrders(slug: $slug) {
				    address
				    createdUnix
				    curveType
				    delta
				    mmCompoundFees
				    mmFeeBps
				    nftsForSale {
				      onchainId
				    }
				    nftsHeld
				    ownerAddress
				    poolType
				    solBalance
				    startingPrice
						buyNowPrice
				    sellNowPrice
				    statsAccumulatedMmProfit
				    statsTakerBuyCount
				    statsTakerSellCount
				    takerBuyCount
				    takerSellCount
				    updatedAt
				  }
				}
			`,
			variables: {
				slug: slug,
			}
		})

		return resp.data.tswapOrders
	}

	async getHSActiveOrders(slug) {
		const resp = await this.client.query({
			query: gql`
			  	query HadeSwapActiveOrders($slug: String!) {
				  hswapOrders(slug: $slug) {
				    address
				    assetReceiver
				    baseSpotPrice
				    boxes {
				      mint {
				        onchainId
				      }
				    }
				    buyOrdersQuantity
				    createdAt
				    curveType
				    delta
				    feeBps
				    fundsSolOrTokenBalance
				    lastTransactedAt
				    mathCounter
				    pairType
				  }
				}
			`,
			variables: {
				slug: slug,
			}
		})

		return resp.data.hswapOrders
	}

	async getCollectionChartData(slug) {
		const _date = new Date()

		let url = process.env.NODE_ENV === 'production' ? '/chart' : 'https://api-tradingview.tensor.so/tv/history'
		url += `?symbol=${slug}/SOL&resolution=5&countback=288&from=1&to=${(_date.valueOf()/1000).toFixed()}`

		const resp = await fetch(url, {headers: {'X-TENSOR-API-KEY': this.api_key}}).then(r => r.json())

		return resp
	}
}