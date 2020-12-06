import fs from 'fs'
import {
  part1,
  part2,
} from './d06'

const sample = `abc

a
b
c

ab
ac

a
a
a
a

b`

describe ('sample', () => {
  test('part1', () => {
    const expected = 11
    const actual = part1(sample)
    expect(actual).toEqual(expected)
  })

  test('part2', () => {
    const expected = 6
    const actual = part2(sample)
    expect(actual).toEqual(expected)
  })
})

describe('puzzle', () => {
  const input = fs.readFileSync('./d06/d06.input.txt', 'utf8').trim()

  test('part 1', () => {
    expect(part1(input)).toEqual(6703)
  })

  test('part2', () => {
    const expected = 3430
    const actual = part2(input)
    expect(actual).toEqual(expected)
  })
})
