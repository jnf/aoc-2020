import fs from 'fs'
import {
  part1,
  part2,
} from './d08'

const puzzleInput = fs.readFileSync('./d08/d08.input.txt', 'utf8').trim().split(/\n/)
const sample = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`.trim().split(/\n/)

describe('part 1', () => {
  test('sample', () => {
    const expected = 5
    const actual = part1(sample)[0]
    expect(actual).toEqual(expected)
  })

  test('puzzleInput', () => {
    const expected = 1528
    const actual = part1(puzzleInput)[0]
    expect(actual).toEqual(expected)
  })
})

describe('part 2', () => {
  test('sample', () => {
    const expected = 8
    const actual = part2(sample)
    expect(actual).toEqual(expected)
  })

  test('puzzleInput', () => {
    const expected = 640
    const actual = part2(puzzleInput)
    expect(actual).toEqual(expected)
  })
})
