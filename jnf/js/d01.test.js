import fs from 'fs'
import readline from 'readline'

import { bruteForcePair, triplet } from './d01.1.js'

describe("part 1", () => {
  describe("dev input", () => {
    const simpleInput = [
      1721,
      979,
      366,
      299,
      675,
      1456,
    ]

    test("bruteForcePair", () => {
      const expected = [1721, 299]
      const actual = bruteForcePair([...simpleInput]).sort()
      expect(actual).toEqual(expected)
    })
  })

  describe("puzzle input", () => {
    test("bruteForcePair", () => {
      const expected = [1069, 951]
      const list = fs.readFileSync('./d01.input.txt', 'utf8')
        .split("\n")
        .map(i => Number(i))
      const actual = bruteForcePair(list).sort()

      expect(actual).toEqual(expected)
    })
  })
})

describe("part 2", () => {
  describe('dev input', () => {
    const simpleInput = [
      1721,
      979,
      366,
      299,
      675,
      1456,
    ]

    test("triplet", () => {
      const expected = [979, 675, 366].sort()
      const actual = triplet([...simpleInput]).sort()
      expect(actual).toEqual(expected)
    })
  })

  describe('puzzle input', () => {
    test("triplet", () => {
      const expected = [1142, 405, 473].sort()
      const list = fs.readFileSync('./d01.input.txt', 'utf8')
        .split("\n")
        .map(i => Number(i))

      const actual = triplet(list).sort()
      expect(actual).toEqual(expected)
    })
  })
})
