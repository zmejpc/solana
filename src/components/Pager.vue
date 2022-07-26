<template>
	<div class="d-flex my-4">
		<button @click="prev" :disabled="page < 2" class="btn btn-primary btn-sm mr-2">
			<BIconCaretLeft />
			<span>Prev</span>
		</button>
		<button @click="next" class="btn btn-primary btn-sm">
			<span>Next</span>
			<BIconCaretRight />
		</button>
		<div class="d-flex align-items-center ml-3">
			<span class="mr-1">Per Page:</span> 
			<v-select :clearable="false" :options="perPageOptions" v-model="perPage" @update:modelValue="setPerPage"></v-select>
		</div>
	</div>
</template>

<script>
import { BIconCaretLeft, BIconCaretRight } from 'bootstrap-icons-vue'
import vSelect from 'vue-select'

export default {
	name: 'Pager',
	components: {
		BIconCaretRight,
		BIconCaretLeft,
		vSelect,
	},
	props: {
		parentPerPage: Number,
		page: Number
	},
	data() {
		return {
			perPageOptions: [5, 10, 15, 20, 50],
			perPage: this.parentPerPage,
		}
	},
	methods: {
		prev() {
			this.$emit('prev')
		},
		next() {
			this.$emit('next')
		},
		setPerPage(perPage) {
			this.perPage = perPage
			this.$emit('perPage', perPage)
		}
	},
	watch: {
		parentPerPage(perPage) {
			this.perPage = perPage
		}
	}
};
</script>

<style scoped>
.v-select {
	width: 60px;
}
</style>