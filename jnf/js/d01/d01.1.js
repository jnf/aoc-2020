const bruteForcePair = (list=[], sum=2020) => {
  let left, right
  while (list.length) {
    left = list.shift()
    right = sum - left
    if (list.includes(right)) return [left, right]
  }

  return []
}

const triplet = (list=[], goal=2020) => {
  let solution = []
  list.some(value => {
    const diff = goal - value
    const test = [value, ...bruteForcePair([...list], diff)]
    if (test.length >= 2) solution = test
    return solution.length
  })

  return solution
}

export {
  bruteForcePair,
  triplet
}
