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

  // const dict = list.sort().reduce((acc, value) => ({...acc, [value]: { values: [value], sum: value } }), {})
  //
  // Object.entries(dict).map(([strKey, { values, sum }]) => {
  //   const key = Number(strKey)
  //   // push the value into the key's values if it's still under goal
  //   list.forEach(strValue => {
  //     const value = Number(strValue)
  //     if (value === key) return // but not for itself
  //     if (sum === goal) return // and not if we've already reached out goal
  //     if (sum + value > goal) return // _the price is right_ rules
  //
  //     sum += value // update our local sum
  //     dict[key].values.push(value)
  //     dict[key].sum = sum // and memoize in the object
  //   })
  // })
  // console.log(dict)
}

export {
  bruteForcePair,
  triplet
}
