<template>
	<div class="container">
		<LatestCollections />
		<div class="mt-5"></div>
		<!-- <AllCollections /> -->
	</div>
	<ConnectWallet />
</template>

<script setup>
import LatestCollections from '../components/LatestCollections.vue'
import AllCollections from '../components/AllCollections.vue'
import ConnectWallet from '../components/ConnectWallet.vue'
import { useMainStore } from '@/stores/main'
import { onMounted } from 'vue'

const store = useMainStore()

onMounted(() => store.loadCollections());

</script>