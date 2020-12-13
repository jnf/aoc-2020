const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

const sameSame = (grid1, grid2) => grid1.flat().join('-') === grid2.flat().join('-')
const willSit = (seat, adjs) => seat === EMPTY && adjs.every(adj => adj !== OCCUPIED)
const willGo = (seat, adjs, max) => seat === OCCUPIED && adjs.filter(adj => adj === OCCUPIED).length > max

const getAdjacent = (r, c, grid) => ([
  grid[r-1] && grid[r-1][c-1],  // up left
  grid[r-1] && grid[r-1][c],    // up
  grid[r-1] && grid[r-1][c+1],  // up right
  grid[r][c-1],                 // left
  grid[r][c+1],                 // right
  grid[r+1] && grid[r+1][c-1],  // down left
  grid[r+1] && grid[r+1][c],    // down
  grid[r+1] && grid[r+1][c+1],  // down right
]).filter(n => n) // trim the overflows (undefined)

const travel = (r, c, grid, rt, ct) => {
  const seat = grid[r+rt] && grid[r+rt][c+ct]
  if (seat === FLOOR) return travel(r+rt, c+ct, grid, rt, ct)
  return seat
}

const getFirstVisible = (r, c, grid) => ([
  travel(r, c, grid, -1, -1), // up left
  travel(r, c, grid, -1, 0),  // up
  travel(r, c, grid, -1, 1),  // up right
  travel(r, c, grid, 0, -1),  // left
  travel(r, c, grid, 0, 1),   // right
  travel(r, c, grid, 1, -1),  // down left
  travel(r, c, grid, 1, 0),   // down
  travel(r, c, grid, 1, 1),   // down right
]).filter(n => n)

const finders = {
  adjacent: getAdjacent,
  linear: getFirstVisible,
}

const playRound = (grid, { gtfo, mode }) => grid.map((row, ri) =>
  row.map((seat, ci) => {
    const neighbors = finders[mode](ri, ci, grid)
    if (willSit(seat, neighbors)) return OCCUPIED // sit if i fits
    if (willGo(seat, neighbors, gtfo - 1)) return EMPTY // kbye
    return seat // meh
  })
)

const findEquilibrium = (grid=[], opts) => {
  const nextGrid = playRound(grid, opts)
  if (sameSame(grid, nextGrid)) return nextGrid
  return findEquilibrium(nextGrid, opts)
}

export {
  OCCUPIED,
  findEquilibrium,
  playRound,
  sameSame,
}
