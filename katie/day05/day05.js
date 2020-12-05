const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8').split("\n")

const FRONT = 0
const BACK = 127
const LEFT = 0
const RIGHT = 7

const decodeBoardingPass = (bp) => {
  const rowCode = bp.substring(0, 7)
  const colCode = bp.substring(7)

  let minRow = FRONT
  let maxRow = BACK

  for (let i = 0; i < rowCode.length; i++) {
    if (rowCode[i] === "B") {
      minRow += Math.ceil((maxRow-minRow ) / 2)
    } else {
      maxRow -= Math.ceil((maxRow-minRow) / 2)
    }
  }

  let minCol = LEFT
  let maxCol = RIGHT

  for (let i = 0; i < colCode.length; i++) {
    if (colCode[i] === "R") {
      minCol += Math.ceil((maxCol-minCol ) / 2)
    } else {
      maxCol -= Math.ceil((maxCol-minCol) / 2)
    }
  }

  return { row: maxRow, col: maxCol, ID: (maxRow * 8) + maxCol }
}

const maxID = () => {
  let max = 0
  input.forEach(pass => {
    const decoded = decodeBoardingPass(pass)
    if (decoded.ID > max) max = decoded.ID
  })

  return max
}

const myID = () => {
  const maxPossibleID = ((BACK * 8) + RIGHT)
  let seats = Array(maxPossibleID).fill(false)

  input.forEach(pass => {
    const decoded = decodeBoardingPass(pass)
    seats[decoded.ID] = true
  })

  return [...seats.keys()].find(seat => !seats[seat] && seats[seat-1] && seats[seat+1])
}

console.log("Part 1:", maxID()) //835
console.log("Part 2:", myID()) //649
