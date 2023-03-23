<template>
  <v-chart class="chart" :option="options" />
</template>

<script setup>
import { TitleComponent, TooltipComponent, ToolboxComponent, LegendComponent, GridComponent, DataZoomComponent } from "echarts/components";
import { CandlestickChart, BarChart } from "echarts/charts";
import { ref, watch, provide, defineProps } from "vue";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { use } from "echarts/core";

use([
	DataZoomComponent,
	TooltipComponent,
	ToolboxComponent,
	CandlestickChart,
	LegendComponent,
	CanvasRenderer,
	TitleComponent,
	GridComponent,
	BarChart
]);

provide(THEME_KEY, "dark");

let options = ref({})

const props = defineProps(['chartData'])

watch(() => props.chartData, setOptions);

let xAxisData = []

function setOptions() {

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
				name: 'Volume ◎',
				nameLocation: 'middle',
				nameGap: 45,
				nameRotate: -90,
				alignTicks: true
			},
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
		series: [
			{
				type: 'candlestick',
				name: 'OHLC',
				data: mapOHLCData(),
			},
			{
				name: 'Volume',
				type: 'bar',
				yAxisIndex: 1,
				data: mapVolumeData()
			}
		]
	}
}

function mapVolumeData() {
	let data = []

	for (let i in props.chartData['t']) {
		data.push([
			buidDateString(new Date(props.chartData['t'][i] * 1000)),
			props.chartData['v'][i],
		])
	}

	return data
}

function mapOHLCData() {
	let data = []

	for (let i in props.chartData['t']) {
		data.push([
			props.chartData['o'][i],
			props.chartData['c'][i],
			props.chartData['l'][i],
			props.chartData['h'][i],
		])
	}

	return data
}

function buildxAxisData() {

	return props.chartData['t'].map(t => buidDateString(new Date(t * 1000)))
}

function buidDateString(_Date) {
		
	return _Date.toLocaleDateString()+' '+(_Date.toLocaleTimeString())
}

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>