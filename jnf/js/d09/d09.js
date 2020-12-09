const findException = (list, preamble=25) => {
  return list.find((sum, index) => {
    if (index < preamble) return false // skip the first set

    const sublist = list.slice(index - preamble, index)
    return !sublist.some(num => sum - num !== num && sublist.includes(sum - num))
  })
}

const findContiguousSum = (list, target, sum=0, start=0, end=0) => {
  while (sum !== target && end <= list.length) {
    sum += list[end]
    end += 1
    if (sum > target) { sum = 0; start += 1; end = start } // eh, start over
  }

  const sublist = list.slice(start, end).sort()
  return sublist[0] + sublist[sublist.length-1]
}

export {
  findContiguousSum,
  findException,
}
