import { countTrees, productOfSlopes } from './d03'
import fs from 'fs'

const testPattern = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

describe('countTrees', () => {
  test('return 0 is called with no arguments or an empty patterns', () => {
    expect(countTrees()).toEqual(0)
    expect(countTrees('')).toEqual(0)
  })

  test('seven trees in the test pattern for right 3, down 1', () => {
    expect(countTrees(testPattern)).toEqual(7)
  })

  test('puzzle input, part 1', () => {
    const pattern = fs.readFileSync('./d03/d03.input.txt', 'utf8')
    expect(countTrees(pattern)).toEqual(218)
  })
})

describe('productOfSlopes', () => {
  const pattern = fs.readFileSync('./d03/d03.input.txt', 'utf8')
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]

  test('maths well with just the one known slope', () => {
    const expected = 218
    const actual = productOfSlopes(pattern, [{ right: 3, down: 1}])
    expect(actual).toEqual(expected)
  })

  test('maths well with all the slopes for the wee sample', () => {
    const expected = 336
    const actual = productOfSlopes(testPattern, slopes)
    expect(actual).toEqual(expected)
  })

  test('maths well with all the slopes for the puzzle input', () => {
    const expected = 3847183340
    const actual = productOfSlopes(pattern, slopes)
    expect(actual).toEqual(expected)
  })
})
