import fs from 'fs'
import {
  howManyHave,
  howManyInside,
  parseLine,
  parseLines,
} from './d07'

const puzzleInput = fs.readFileSync('./d07/d07.input.txt', 'utf8').trim()

const sample = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim()

const sample2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`.trim()

describe('parsing', () => {
  test('parse one line', () => {
    const line = 'light red bags contain 1 bright white bag, 2 muted yellow bags.'
    const expected = ['light red', { 'bright white': 1, 'muted yellow': 2 }]
    const actual = parseLine(line)

    expect(actual).toStrictEqual(expected)
  })

  test('parseLines', () => {
    const actual = parseLines(sample)
    const expected = {
      'light red': { 'bright white': 1, 'muted yellow': 2 },
      'dark orange': { 'bright white': 3, 'muted yellow': 4 },
      'bright white': { 'shiny gold': 1 },
      'muted yellow': { 'shiny gold': 2, 'faded blue': 9 },
      'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
      'dark olive': { 'faded blue': 3, 'dotted black': 4 },
      'vibrant plum': { 'faded blue': 5, 'dotted black': 6 },
      'faded blue': {},
      'dotted black': {}
    }

    expect(actual).toStrictEqual(expected)
  })
})

describe('part1', () => {
  test('sample', () => {
    const actual = howManyHave('shiny gold', parseLines(sample))
    const expected = 4
    expect(actual).toEqual(expected)
  })

  test('puzzleInput', () => {
    const actual = howManyHave('shiny gold', parseLines(puzzleInput))
    const expected = 332
    expect(actual).toEqual(expected)
  })
})

describe('part2', () => {
  test('sample', () => {
    const actual = howManyInside('shiny gold', parseLines(sample))
    const expected = 32
    expect(actual).toEqual(expected)
  })

  test('sample2', () => {
    const actual = howManyInside('shiny gold', parseLines(sample2))
    const expected = 126
    expect(actual).toEqual(expected)
  })

  test('puzzleInput', () => {
    const actual = howManyInside('shiny gold', parseLines(puzzleInput))
    const expected = 10875
    expect(actual).toEqual(expected)
  })
})
