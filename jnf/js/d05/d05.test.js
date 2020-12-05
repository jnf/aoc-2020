import fs from 'fs'
import {
  deduceSeat,
  getSeatID,
  maxID,
  solveColumn,
  solveRow,
} from './d05'

const samples = [
  { code: 'FBFBBFFRLR', row: 44, column: 5, id: 357 },
  { code: 'BFFFBBFRRR', row: 70, column: 7, id: 567 },
  { code: 'FFFBBBFRRR', row: 14, column: 7, id: 119 },
  { code: 'BBFFBBFRLL', row: 102, column: 4, id: 820 },
]

describe('samples', () => {
  test('getSeatID', () => {
    expect(samples.every(({ row, column, id }) => getSeatID(row, column) === id)).toBe(true)
  })

  test('solveRow', () => {
    samples.forEach(({ code, row }) => {
      const [rowStr] = code.match(/.{1,7}/g)
      expect(solveRow(rowStr)).toEqual(row)
    })
  })

  test('solveColumn', () => {
    samples.forEach(({ code, column }) => {
      const [, columnStr] = code.match(/.{1,7}/g)
      expect(solveColumn(columnStr)).toEqual(column)
    })
  })

  test('maxID', () => {
    const codes = samples.map(s => s.code)
    const max = Math.max(...samples.map(s => s.id))
    expect(maxID(codes)).toEqual(max)
  })
})

describe('puzzle input', () => {
  const input = fs.readFileSync('./d05/d05.input.txt', 'utf8').split(/\n/).filter(l => l.length)
  test('part 1', () => {
    expect(maxID(input)).toEqual(861)
  })

  test('part 2', () => {
    expect(deduceSeat(input)).toEqual(633)
  })
})
