const fs = require("fs")

const NO_BAGS = "no other bags."
const GOLD = "shiny gold"

const newline = "\r\n"
const input = fs.readFileSync("./input.txt", "utf8")
	.split(newline)
	.reduce((acc, line) => {
		const rule = line.split(" bags contain ")

		if (rule[1] === NO_BAGS) {
			acc[rule[0]] = {}
			return acc
		}

		acc[rule[0]] = rule[1].split(", ").reduce((acc2, bag) => {
			const match = bag.match(/^(\d*)\s(.*)\sbag/)
			acc2[match[2]] = Number(match[1])
			return acc2
		}, {})
		return acc

	}, {})

const bagsContaining = (bag) => {
	return Object.keys(input).filter(container => Object.keys(input[container]).includes(bag))
}

const allBagsContaining = (bag) => {
	const checkFor = [bag]
	const allBags = new Set()

	while (checkFor.length > 0) {
		const checking = checkFor[0]
		checkFor.splice(0, 1)

		const containers = bagsContaining(checking)
		if (containers.length > 0) {
			checkFor.push(...containers)
			containers.forEach(item => allBags.add(item))
		}
	}

	return allBags
}

const bagContains = (bag) => {
	let bagCount = 0
	let contents = input[bag]

	if (Object.keys(contents).length === 0) return bagCount

	Object.keys(contents).forEach(content => {
		const count = contents[content]
		bagCount += count + (count * bagContains(content))
	})

	return bagCount
}

console.log("Part 1:", allBagsContaining(GOLD).size)
console.log("Part 2:", bagContains(GOLD))
