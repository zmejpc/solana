<template>
	<div class="container">
		<TopCollections />
		<div class="my-5">&nbsp;</div>
		<LatestCollections />
	</div>
	<ConnectWallet />
</template>

<script setup>
import LatestCollections from '../components/LatestCollections.vue'
import TopCollections from '../components/TopCollections.vue'
import ConnectWallet from '../components/ConnectWallet.vue'
import { useMainStore } from '@/stores/main'
import { onMounted } from 'vue'

const store = useMainStore()

onMounted(() => store.loadCollections());

</script>