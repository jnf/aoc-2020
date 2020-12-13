import fs from 'fs'
import samples from './d11.samples'
import {
  OCCUPIED,
  findEquilibrium,
  playRound,
  sameSame
} from './d11'

const prepare = gridStr => gridStr.trim().split(/\n/).map(row => row.split(''))
const puzzle = prepare(fs.readFileSync('./d11/d11.input.txt', 'utf8'))
const r0 = prepare(samples.r0)

describe('atomic functions', () => {
  const [r0, r1, r2, r3, r4, r5] = Object.values(samples).map(prepare)
  const opts = {
    gtfo: 4,
    mode: 'adjacent',
  }

  test('playRound', () => {
    expect(playRound(r0, opts)).toStrictEqual(r1)
    expect(playRound(r1, opts)).toStrictEqual(r2)
    expect(playRound(r2, opts)).toStrictEqual(r3)
    expect(playRound(r3, opts)).toStrictEqual(r4)
    expect(playRound(r4, opts)).toStrictEqual(r5)
  })

  test('sameSame', () => {
    const r6 = playRound(r5, opts)
    expect(r6).toStrictEqual(r5)
    expect(sameSame(r5, r6)).toBe(true)
  })
})

describe('part1', () => {
  const opts = {
    gtfo: 4,
    mode: 'adjacent',
  }

  test('sample', () => {
    const expected = 37
    const actual = findEquilibrium(r0, opts).flat().filter(s => s === OCCUPIED).length
    expect(actual).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 2277
    const actual = findEquilibrium(puzzle, opts).flat().filter(s => s === OCCUPIED).length
    expect(actual).toEqual(expected)
  })
})

describe('part2', () => {
  const opts = {
    gtfo: 5,
    mode: 'linear',
  }

  test('sample', () => {
    const expected = 26
    const actual = findEquilibrium(r0, opts).flat().filter(s => s === OCCUPIED).length
    expect(actual).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 2066
    const actual = findEquilibrium(puzzle, opts).flat().filter(s => s === OCCUPIED).length
    expect(actual).toEqual(expected)
  })
})
