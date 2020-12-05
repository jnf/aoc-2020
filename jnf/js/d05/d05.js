const SALT = 8
const solveRow = code => solver(code, 0, 127, 'F')
const solveColumn = code => solver(code, 0, 7, 'L')
const getSeatID = (row, column) => row * SALT + column

const solver = (code, low, high, lowMarker) => {
  for (const n of code) {
    const diff = Math.floor((high - low) / 2)
    n === lowMarker
      ? high = low + diff // keep lower half
      : low = high - diff // keep upper half
  }

  return low
}

const maxID = codes => Math.max(...codes.map(code => {
  const [rowStr, columnStr] = code.match(/.{1,7}/g)
  return getSeatID(solveRow(rowStr), solveColumn(columnStr))
}))

const deduceSeat = codes => {
  const ids = codes.map(code => {
    const [rowStr, columnStr] = code.match(/.{1,7}/g)
    return getSeatID(solveRow(rowStr), solveColumn(columnStr))
  }).sort()

  return ids[ids.findIndex((id, index) => ids[index+1] && ids[index+1] !== id + 1)] + 1
}

export {
  deduceSeat,
  getSeatID,
  maxID,
  solveColumn,
  solveRow,
}
