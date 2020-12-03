const TREE = '#'
const countTrees = (raw='', right=3, down=1, trees=0) => {
  const pattern = Array.isArray(raw) ? raw : raw.split(/\n/)
  let x = right, y = down, width = pattern[0].length

  while (y < pattern.length) {
    if (pattern[y][x] === TREE) trees++
    x = (x + right) % width
    y += down
  }

  return trees
}

const productOfSlopes = (raw, slopes) => {
  const pattern = raw.split(/\n/)
  return slopes.reduce((product, { right, down }) => product * countTrees(pattern, right, down), 1)
}

export {
  countTrees,
  productOfSlopes,
}
