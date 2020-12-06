const part1 = raw => {
  const lines = raw.split(/\n\n/).map(group => group.replace(/\n/g, ''))
  const map = lines.map(line => {
    const letters = {}
    for (const letter of line) {
      letters[letter] = (letters[letter] || 0) + 1
    }
    return letters
  })

  return map.reduce((acc, obj) => acc + Object.keys(obj).length, 0)
}

const part2 = raw => {
  const map = raw.split(/\n\n/).map(line => {
    const peoples = line.split(/\n/)
    const answers = peoples.reduce((acc, person) => {
      for (const letter of person) {
        acc[letter] = (acc[letter] || 0) + 1
      }
      return acc
    }, {})

    return { answers, peepCount: peoples.length }
  })

  return map.reduce((acc, { answers, peepCount }) => {
    const counts = Object.values(answers)
    const more = counts.filter(count => count === peepCount).length
    return acc + more
  }, 0)
}

export {
  part1,
  part2,
}
