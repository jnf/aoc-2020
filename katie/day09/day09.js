const fs = require('fs')

const newline = "\r\n"
const input = fs.readFileSync('./input.txt', 'utf8')
	.split(newline)
	.map(line => Number(line))
const PREAMBLE_LENGTH = 25

const findSumPair = (numbers, sum) => {
	const firstNum = numbers.find(num => {
		const search = [...numbers]
		search.splice(numbers.indexOf(num), 1)
		return search.includes(sum - num)
	})

	return firstNum ? [firstNum, sum - firstNum] : false
}

const xmasHax0r = () => {
	const numbers = [...input].splice(0, PREAMBLE_LENGTH)
	let pair = findSumPair(numbers, input[PREAMBLE_LENGTH])
	let index = PREAMBLE_LENGTH

	while (pair) {
		numbers.splice(0, 1)
		numbers.push(input[index])
		index++

		pair = findSumPair(numbers, input[index])
	}

	return input[index]
}

const ultimateHax0r = () => {
	const num = xmasHax0r()

	for (let i = 0; i < input.length; i++) {
		let sum = input[i]
		let j = i + 1

		while (sum < num) {
			sum += input[j]
			j++
		}

		if (sum === num) {
			const contiguous = [...input].splice(i, j - i).sort((a, b) => a - b)
			return contiguous[0] + contiguous[contiguous.length-1]
		}
	}
}

console.log("Part 1:", xmasHax0r())
console.log("Part 2:", ultimateHax0r())
