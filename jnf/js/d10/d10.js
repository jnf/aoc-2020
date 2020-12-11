const part1 = (orig, diffs={1: 0, 2: 0, 3: 1}) => ([0, ...orig])
  .sort((a, b) => a - b)
  .reduce((acc, item, index, list) => {
    acc[list[index+1]-item] += 1
    return acc
  }, diffs)

const compatible = (v1, v2) => v2 > v1 && v2 - v1 < 4
const part2 = orig => {
  const list = orig.sort((a, b) => a - b)
  const memo = {}

  const combos = listIndex => {
    if (memo[listIndex]) return memo[listIndex]
    if (listIndex === list.length - 1) return 1 // we're at the end of the list

    memo[listIndex] = list.reduce((acc, adapter, index) => {
      if (listIndex > index) return acc // don't recount entries
      if (!compatible(list[listIndex], adapter)) return acc // only use compatible adapters
      return acc + combos(index) // recurse and memoize
    }, 0)

    return memo[listIndex]
  }

  return list
    .filter(adapter => compatible(0, adapter)) // starting set
    .reduce((total, adapter, index) => total + combos(index), 0)
}

export {
  part1,
  part2,
}
