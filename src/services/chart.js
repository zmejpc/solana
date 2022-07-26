import * as echarts from 'echarts';

export default class Chart {

	listAmount = []

	xAxisData = []

	data = []

	seriesData = {
		'buyNow': {
			'type': 'effectScatter',
			'name': 'Buy now',
			'data': {},
			'symbolSize': 2,
			'rippleEffect': {
				'scale': 10
			}
		},
		'floorPrice': {
			'type': 'line',
			'name': 'Floor price',
			'data': {},
			'yAxisIndex': 1,
			'lineStyle': {
				'color': '#2a2a40'
			},
			'areaStyle': {
				'color': '#2a2a40'
			}
		},
		'list': {
			'type': 'line',
			'name': 'List',
			'smooth': true,
			'data': {}
		},
	}

	constructor(data) {
		this.data = data
	}

	init(domEl) {
		const myChart = echarts.init(domEl, 'dark')
		this.prepareData()
		myChart.setOption(this.getOptions())
	}

	prepareData() {
		this.data.forEach(item => {
			this.xAxisData.push(item.blockTime)
			this.addSeriesData(item)
		})
		console.log(this.seriesData)
	}

	addSeriesData(item) {
		const _date = new Date(item.blockTime * 1000).toLocaleDateString()

		switch (item.type) {

			case 'buyNow':
				if (this.seriesData[item.type].data[_date]) {
					this.seriesData[item.type].data[_date] += item.price
				} else {
					this.seriesData[item.type].data[_date] = item.price
				}
			break;

			case 'list':
			case 'delist':
				if (this.seriesData['list'].data[_date]) {
					this.seriesData['list'].data[_date] += (item.type == 'list' ? 1 : -1)
				} else {
					this.seriesData['list'].data[_date] = 1
				}

				if (item.type == 'list') {
					if (this.seriesData['floorPrice'].data[_date]) {
						this.seriesData['floorPrice'].data[_date] = Math.min(this.seriesData['floorPrice'].data[_date], item.price)
					} else {
						this.seriesData['floorPrice'].data[_date] = item.price
					}
				}
			break;

		}
	}

	buildSeries() {
		const data = []

		for (const [type, item] of Object.entries(this.seriesData)) {
			data.push({
				...item,
				data: this.buildSeriesData(item.data)
			})
		}
console.log(data)
		return data
	}

	buildSeriesData(item) {
		const data = []

		for (const k in item) {
			data.push([k, item[k]])
		}

		return data
	}

	buildxAxisData() {
		const data = []
		const currDate = new Date(this.xAxisData.sort()[0] * 1000)
		const today = new Date

		while (currDate <= today) {
			data.push(currDate.toLocaleDateString())
			currDate.setDate(currDate.getDate() + 1)
		}

		data.push(currDate.toLocaleDateString())

		return data
	}

	getOptions() {
		return {
			title: {
				text: 'Activities',
				left: '1%',
				top: '3%'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				type: 'scroll',
				top: '3%'
			},
			xAxis: {
				data: this.buildxAxisData()
			},
			yAxis: [
				{
					alignTicks: true
				},
				{
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
			series: this.buildSeries()
		}
	}
}