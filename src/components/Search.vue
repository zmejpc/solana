<template>
	<div class="search">
		<input @keydown="search" type="text" name="search" class="form-control" placeholder="Search" autocomplete="off">
		<div class="search__results px-2 pb-2">
			<div :key="item.symbol" v-for="item in results" class="row mt-2">
				<div class="col-4">
					<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}">
						<video v-if="isVideo(item.image)" autoplay muted loop class="w-100">
							<source :src="item.image" type="video/mp4">
						</video>
						<img v-else :src="item.image" :alt="item.name" class="img-fluid">
					</router-link>
				</div>
				<div class="col-8">
					<router-link :to="{name: 'Collection', params: {symbol: item.symbol}}">
						{{ item.name }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Search',
		methods: {
			isVideo(src) {
				return src.match(/\.mp4/)
			},
			search(e) {
				if (e.keyCode == 13) {

					this.results = this.$store.state.topCollections.filter(el => el.name.indexOf(e.target.value) > -1)

					document.addEventListener('click', (e) => {
						if (!e.target.closest('.search__results') || e.target.tagName == 'A') {
							this.results = []
						}
					}, {once: true})

				} else if(e.keyCode == 27) {
					this.results = []
				}
			}
		},
		data() {
			return {
				results: Array
			}
		}
	};
</script>

<style lang="scss" scoped>
.search {
	max-width: 200px;
	position: relative;

	&__results {
		position: absolute;
		background: #000;
		z-index: 1;
		font-size: 13px;
	}
}
[name="search"] {
	border-radius: 10px;
	border-color: $primary;
	background-color: #000;

	&:focus, &:disabled {
		background-color: #000;
	}
}
</style>