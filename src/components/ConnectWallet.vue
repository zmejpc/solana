<template>
	<button v-if="connected" @click="disconnect" class="btn btn-sm btn-primary">Wallet conntected</button>
	<button v-else @click="connect" class="btn btn-sm btn-warning">Conntect wallet</button>
</template>

<script>
	export default {
		name: 'ConnectWallet',
		data() {
			return {
				connected: false
			}
		},
		mounted() {
			if (window.solana) {
				window.solana.connect().then((x) => {
					this.connected = window.solana.isConnected
				})
			}
		},
		methods: {
			connect() {
				if (!window.solana) {
					alert('You need "Phantom" extension for browser')
				} else {
					window.solana.connect().then((x) => {
						this.connected = window.solana.isConnected
						// console.log(x.publicKey.toString())
					})
				}
			},
			disconnect() {
				window.solana.disconnect().then((x) => {
					this.connected = window.solana.isConnected
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
button {
	position: absolute;
	transform: rotate(90deg);
	right: -2.5rem;
	top: 8rem;
}
</style>