<template>
	<div class="container">
		<TopCollections />
		<div class="mt-5"></div>
		<LatestCollections />
	</div>
	<ConnectWallet />
</template>

<script>
import LatestCollections from '../components/LatestCollections.vue'
import TopCollections from '../components/TopCollections.vue'
import ConnectWallet from '../components/ConnectWallet.vue'

export default {
	name: 'Home',
	components: {
		LatestCollections,
		TopCollections,
		ConnectWallet
	},
	methods: {

	}
};
</script>