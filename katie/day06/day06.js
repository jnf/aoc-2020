const fs = require('fs')

const newline = "\r\n"
const input = fs.readFileSync('./input.txt', 'utf8')
	.split(newline+newline)
	.map(group => group.split(newline))

const groupAnswerCount = (group, part1) => {
	const answers = {}

	group.forEach(person => {
		person.split('').forEach(answer => {
			if (!(answer in answers)) answers[answer] = 0
			answers[answer]++
		})
	})

	if (part1) return Object.keys(answers).length

	return Object.keys(answers).filter(answer => answers[answer] === group.length).length
}

const planeAnswerSum = (groups, part1 = true) => 
	groups.reduce((acc, group) => acc += groupAnswerCount(group, part1), 0)

console.log("Part 1:", planeAnswerSum(input))
console.log("Part 2:", planeAnswerSum(input, false))
