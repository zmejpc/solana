<template>
  <v-chart class="chart" :option="options" :update-options="{notMerge: false}" />
</template>

<script setup>
import { TitleComponent, TooltipComponent, ToolboxComponent, LegendComponent, GridComponent, DataZoomComponent } from "echarts/components";
import { LineChart, EffectScatterChart } from "echarts/charts";
import { ref, watch, provide, defineProps } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";

use([
	EffectScatterChart,
	DataZoomComponent,
	TooltipComponent,
	ToolboxComponent,
	LegendComponent,
	CanvasRenderer,
	TitleComponent,
	GridComponent,
	LineChart,
]);

provide(THEME_KEY, "dark");

let options = ref({})

let listedCount

const props = defineProps(['chartData', 'listedCount'])

watch(() => props.chartData, setOptions);

let xAxisData = [], seriesData = {
	'buyNow': {
		'type': 'effectScatter',
		'name': 'Sale',
		'data': {},
		'z': 2,
		'symbolSize': 2,
		'rippleEffect': {
			'scale': 10
		},
		'tooltip': {
			'valueFormatter': value => value + '◎'
		}
	},
	'list': {
		'type': 'line',
		'name': 'Listed',
		'data': {},
		'z': 1,
		'yAxisIndex': 1,
		'lineStyle': {
			'color': '#2a2a40'
		},
		'areaStyle': {
			'color': '#2a2a40'
		}
	},
	'floorPrice': {
		'type': 'line',
		'name': 'Floor price',
		'data': {},
		'z': 3,
		'smooth': true,
		'tooltip': {
			'valueFormatter': value => value + '◎'
		}
	},
}

function setOptions() {

	listedCount = props.listedCount

	seriesData.floorPrice.data = {}
	seriesData.buyNow.data = {}
	seriesData.list.data = {}

	props.chartData.forEach(item => {
		xAxisData.push(item.blockTime)
		addSeriesData(item)
	})

	options.value = {
		title: null,
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			type: 'scroll',
			top: '3%'
		},
		grid: {
			left: 60,
			right: 60,
			bottom: 60,
		},
		xAxis: {
			data: buildxAxisData()
		},
		yAxis: [
			{
				name: 'Price ◎',
				nameLocation: 'middle',
				nameGap: 30,
				alignTicks: true
			},
			{
				name: 'Quantity',
				nameLocation: 'middle',
				nameGap: 30,
				nameRotate: -90,
				alignTicks: true,
				position: 'right'
			}
		],
		toolbox: {
			right: 10,
			feature: {
				restore: {},
				saveAsImage: {}
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: buildSeries()
	}
}

function buildSeries() {
	const data = []

	for (const [type, item] of Object.entries(seriesData)) {
		data.push({
			...item,
			data: buildSeriesData(item.data)
		})
	}

	return data
}

function buildSeriesData(item) {
	const data = []

	for (const k in item) {
		if (Array.isArray(item[k])) {

			item[k].forEach((el) => {
				data.push([k, el])
			})

		} else {
			data.push([k, item[k]])
		}
	}

	return data
}

function addSeriesData(item) {
	const _Date = new Date(item.blockTime * 1000)
	const _date = buidDateString(_Date)

	switch (item.type) {

		case 'buyNow':
			if (!item.price) {
				return
			}

			if (!seriesData[item.type].data[_date]) {
				seriesData[item.type].data[_date] = []
			}

			seriesData[item.type].data[_date].push([item.price])

			if (seriesData['list'].data[_date] === undefined) {
				seriesData['list'].data[_date] = listedCount++
			}

			if (seriesData['floorPrice'].data[_date]) {
				seriesData['floorPrice'].data[_date] = Math.min(seriesData['floorPrice'].data[_date], item.price)
			} else {
				seriesData['floorPrice'].data[_date] = item.price
			}
		break;

		case 'list':
			seriesData['list'].data[_date] = listedCount--
		break;

		case 'delist':
			seriesData['list'].data[_date] = listedCount++
		break;

	}
}

function buildxAxisData() {

	return xAxisData.sort().map(t => buidDateString(new Date(t * 1000)))
}

function buidDateString(_Date) {
		
	return _Date.toLocaleDateString()+' '+(_Date.toLocaleTimeString())//.replace(/(\d{2}):(\d{2})$/, '00');
}

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>