import fs from 'fs'
import {
  part1,
  part2,
} from './d10'

const prepare = raw => raw.trim().split(/\n/).map(Number)
const puzzle = prepare(fs.readFileSync('./d10/d10.input.txt', 'utf8'))
const sample1 = prepare(`16
10
15
5
1
11
7
19
6
12
4`)

const sample2 = prepare(`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`)

describe('part1', () => {
  test('sample1', () => {
    const expected = 7 * 5 //  7 one jolt diffs and 5 3 jolt diffs
    const actual = part1(sample1)
    expect(actual[1] * actual[3]).toEqual(expected)
  })

  test('sample2', () => {
    const expected = 22 * 10
    const actual = part1(sample2)
    expect(actual[1] * actual[3]).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 69 * 33
    const actual = part1(puzzle)
    expect(actual[1] * actual[3]).toEqual(expected)
  })
})

describe('part2', () => {
  test('sample1', () => {
    const expected = 8
    const actual = part2(sample1)
    expect(actual).toEqual(expected)
  })

  test('sample2', () => {
    const expected = 19208
    const actual = part2(sample2)
    expect(actual).toEqual(expected)
  })

  test('puzzle', () => {
    const expected = 37024595836928
    const actual = part2(puzzle)
    expect(actual).toEqual(expected)
  })
})
