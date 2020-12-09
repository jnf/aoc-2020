import fs from 'fs'
import {
  findContiguousSum,
  findException,
} from './d09'

const prepare = raw => raw.trim().split(/\n/).map(n => Number(n))
const puzzle = prepare(fs.readFileSync('./d09/d09.input.txt', 'utf8'))
const sample = prepare(`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`)

describe('findException', () => {
  test('sample', () => {
    const expected = 127
    const actual = findException(sample, 5)

    expect(actual).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 776203571
    const actual = findException(puzzle, 25)

    expect(actual).toEqual(expected)
  })
})

describe('findContiguousSum', () => {
  test('sample', () => {
    const expected = 15 + 47 // min + max
    const actual = findContiguousSum(sample, 127)

    expect(actual).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 104800569
    const actual = findContiguousSum(puzzle, 776203571)

    expect(actual).toEqual(expected)
  })
})
