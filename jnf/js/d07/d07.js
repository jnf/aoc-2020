const parseLines = lines => lines
  .split(/\n/)
  .map(parseLine)
  .reduce((acc, [container, contained]) => ({ ...acc, [container]: contained }), {})

const parseLine = line => {
  const [, container, _contained] = line.match(/^(.+) bags contain (.+)\.$/)

  if (_contained === 'no other bags') return [container, {}]

  const contained = _contained.split(', ').reduce((acc, bags) => {
    const [, number, color] = bags.match(/(\d+) ([\w\s]+) bags?/)
    return { ...acc, [color]: Number(number) }
  }, {})

  return [container, contained]
}

const howManyInside = (starting, colorMap) => {
  const countBags = current => {
    const theseBags = Object.entries(colorMap[current])
    if (!theseBags.length) return 1 // no bags in these bags

    return theseBags.reduce((total, [bagColor, bagCount]) => {
      return total + (bagCount * countBags(bagColor))
    }, 1)
  }

  return countBags(starting) - 1 // don't count yourself
}

const howManyHave = (sought, colorMap) => {
  const hasBag = bagList => bagList.some((color => color === sought || hasBag(Object.keys(colorMap[color]))))

  const allColors = Object.keys(colorMap)
  return allColors.reduce((acc, current) => {
    const colorsContained = Object.keys(colorMap[current])
    if (current === sought) return acc // no inception bags
    if (!colorsContained.length) return acc // don't check empty bags
    if (hasBag(colorsContained)) return acc + 1

    return acc
  }, 0)
}

export {
  howManyHave,
  howManyInside,
  parseLine,
  parseLines,
}
