export function useIsVideo(src) {
	return src.match(/\.mp4/)
}

export function useBuidDateString(timestamp) {
	const _Date = new Date(timestamp)

	return _Date.toLocaleDateString()+' '+(_Date.toLocaleTimeString())
}

export function useBuildPopperContent(item, pad = '') {
	let result = ''

	Object.entries(item).forEach((el) => {
		if (el[1] && typeof el[1] === 'object') {
			result += `<p><span class="bg-danger">&nbsp;${el[0]}&nbsp;</span>:</p>${useBuildPopperContent(el[1], '&emsp;')}`
		} else {
			result += `<p>${pad}<span class="bg-${pad ? 'success' : 'danger'}">&nbsp;${el[0]}&nbsp;</span>: <span>${el[1]}</span></p>`
		}
	})

	return result
}