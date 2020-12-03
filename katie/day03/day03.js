const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

const crashCourse = ({ rise, run }) => {
  const width = input[0].length
  const height = input.length
  let treeCount = 0
  let x = 0

  for (let y = rise; y < height; y += rise) {
    x = ((x + run) % width)
    if (input[y][x] === "#") treeCount++
  }

  return treeCount
}

const multreeplication = (slopes) =>
  slopes.reduce((acc, slope) => acc * crashCourse(slope), 1)

console.log("Part 1:", crashCourse({rise: 1, run: 3}))
console.log("Part 2:", multreeplication([
  { rise: 1, run: 1 },
  { rise: 1, run: 3 },
  { rise: 1, run: 5 },
  { rise: 1, run: 7 },
  { rise: 2, run: 1 },
]))
