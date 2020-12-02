const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')
  .split("\n")
  .reduce((acc, entry) => {
    const line = entry.match(/(\d*)-(\d*)\s(\w):\s(\w*)/)

    if (!line) {
      console.error(`Bad input line: "${entry}"`)
      return acc
    }

    const [match, _min, _max, char, pwd] = line

    acc.push({ min: Number(_min), max: Number(_max), char, pwd })
    return acc
  }, [])

const correctPasswords1 = (list) => {
  return list.filter(entry => {
    const { min, max, char, pwd } = entry
    const re = new RegExp(char, 'g')
    const match = pwd.match(re)

    return (match && match.length >= min && match.length <= max)
  })
}

const correctPasswords2 = (list) => {
  return list.filter(entry => {
    const { min, max, char, pwd } = entry
    const pos1 = pwd.charAt(Number(min) - 1) === char
    const pos2 = pwd.charAt(Number(max) - 1) === char

    // charAt pos1 XOR charAt pos2
    return pos1 ? !pos2 : pos2
  })
}

console.log("Part 1:", correctPasswords1(input).length)
console.log("Part 2:", correctPasswords2(input).length)
