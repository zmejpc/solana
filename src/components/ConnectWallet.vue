<template>
	<button v-if="connected" @click="disconnect" class="btn btn-sm btn-primary">Wallet conntected</button>
	<button v-else @click="connect" class="btn btn-sm btn-warning">Conntect wallet</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let connected = ref(false)

onMounted(() => {
	if (window.solana) {
		window.solana.connect().then((x) => {
			connected = window.solana.isConnected
		})
	}
})

function connect() {
	if (!window.solana) {
		alert('You need "Phantom" extension for browser')
	} else {
		window.solana.connect().then((x) => {
			connected = window.solana.isConnected
			// console.log(x.publicKey.toString())
		})
	}
}

function disconnect() {
	window.solana.disconnect().then((x) => {
		connected = window.solana.isConnected
	})
}

</script>

<style lang="scss" scoped>
button {
	position: absolute;
	transform: rotate(90deg);
	right: -2.5rem;
	top: 8rem;
}
</style>