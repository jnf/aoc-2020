const fs = require('fs')

const newline = "\r\n"
const getInput = () => {
	return fs.readFileSync('./input.txt', 'utf8')
	.split(newline)
	.reduce((acc, line) => {
		const entries = line.split(' ')
		acc.push([entries[0], Number(entries[1])])
		return acc
	}, [])
}

const findAccAtRepeat = (input) => {
	const linesExecuted = Array(input.length).fill(false)
	let acc = 0
	let currentLine = 0

	while (!linesExecuted[currentLine]) {
		linesExecuted[currentLine] = true

		switch(input[currentLine][0]) {
			case "jmp":
				currentLine += input[currentLine][1]
				break;
			case "acc":
				acc += input[currentLine][1]
			default:
				currentLine++
		} 
	}

	return acc
}

const doesTerminate = (input) => {
	const linesExecuted = Array(input.length).fill(false)
	let acc = 0
	let currentLine = 0

	while (!linesExecuted[currentLine] && currentLine < input.length) {
		linesExecuted[currentLine] = true

		switch(input[currentLine][0]) {
			case "jmp":
				currentLine += input[currentLine][1]
				break;
			case "acc":
				acc += input[currentLine][1]
			default:
				currentLine++
		} 
	}

	return currentLine >= input.length ? acc : false
}

const fixLoop = (originalInput) => {
	let currentLine = 0
	let result = doesTerminate(originalInput)

	while (!result) {
		const nextInput = getInput()
		switch(nextInput[currentLine][0]) {
			case "jmp":
				nextInput[currentLine][0] = "nop"
				result = doesTerminate(nextInput)
				break;
			case "nop":
				nextInput[currentLine][0] = "jmp"
				result = doesTerminate(nextInput)
				break;
		}

		currentLine++
	}

	return result
}

console.log("Part 1:", findAccAtRepeat(getInput()))
console.log("Part 2:", fixLoop(getInput()))
