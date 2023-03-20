import * as echarts from 'echarts';

export default class Chart {

	xAxisData = []

	data = []

	listedCount = 0

	seriesData = {
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

	constructor(data, listedCount) {
		this.data = data
		this.listedCount = listedCount
		this.xAxisData = []
	}

	init(domEl) {
		const myChart = echarts.getInstanceByDom(domEl) || echarts.init(domEl, 'dark')
		this.prepareData()
		myChart.setOption(this.getOptions())
	}

	prepareData() {
		this.data.forEach(item => {
			this.xAxisData.push(item.blockTime)
			this.addSeriesData(item)
		})
	}

	buidDateString(_Date) {
		
		return _Date.toLocaleDateString()+' '+(_Date.toLocaleTimeString())//.replace(/(\d{2}):(\d{2})$/, '00');
	}

	addSeriesData(item) {

		const _Date = new Date(item.blockTime * 1000)
		const _date = this.buidDateString(_Date)

		switch (item.type) {

			case 'buyNow':
				if (!item.price) {
					return
				}

				if (!this.seriesData[item.type].data[_date]) {
					this.seriesData[item.type].data[_date] = []
				}

				this.seriesData[item.type].data[_date].push([item.price])

				if (this.seriesData['list'].data[_date] !== undefined) {
					this.seriesData['list'].data[_date] -= 1
				} else {
					this.seriesData['list'].data[_date] = -1
				}

				if (this.seriesData['floorPrice'].data[_date]) {
					this.seriesData['floorPrice'].data[_date] = Math.min(this.seriesData['floorPrice'].data[_date], item.price)
				} else {
					this.seriesData['floorPrice'].data[_date] = item.price
				}
			break;

			case 'list':
			case 'delist':
				if (this.seriesData['list'].data[_date] !== undefined) {
					this.seriesData['list'].data[_date] += (item.type == 'list' ? 1 : -1)
				} else {
					this.seriesData['list'].data[_date] = (item.type == 'list' ? 1 : -1)
				}
			break;

		}
	}

	buildSeries() {
		const data = []

		let listData = Object.entries(this.seriesData['list'].data), result = []

		for (let i = 0; i < listData.length; i++) {

			if (i == 0) {
				listData[i][1] = -this.listedCount
			}

			result[listData[i][0]] = listData
				.filter((v, _i) => _i <= i)
				.map(n => n[1] * (-1))
				.reduce((a, b) => a + b, 0)
		}

		this.seriesData['list'].data = result

		for (const [type, item] of Object.entries(this.seriesData)) {
			data.push({
				...item,
				data: this.buildSeriesData(item.data)
			})
		}

		return data
	}

	buildSeriesData(item) {
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

	buildxAxisData() {

		return this.xAxisData.sort().map(t => this.buidDateString(new Date(t * 1000)))

		// const data = []
		// const currDate = new Date(this.xAxisData.sort()[0] * 1000)
		// const today = new Date

		// while (currDate <= today) {
		// 	data.push(this.buidDateString(currDate))
		// 	currDate.setHours(currDate.getHours() + 1)
		// }

		// data.push(this.buidDateString(currDate))

		// return data
	}

	getOptions() {
		return {
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
				data: this.buildxAxisData()
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
			series: this.buildSeries()
		}
	}
}