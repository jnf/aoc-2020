import fs from 'fs'
import { parse, validatePassport, validatePassportStrict } from './d04'

const puzzle = fs.readFileSync('./d04/d04.input.txt', 'utf8')
const sample = fs.readFileSync('./d04/d04.sample.txt', 'utf8')
const singleEntry = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`

describe('parse', () => {
  test('can make a line into an obj', () => {
    const actual = Object.keys(parse(singleEntry)[0])
    expect(actual.length).toEqual(8)
  })

  test('gets four lines from the sample', () => {
    expect(parse(sample).length).toEqual(4)
  })
})

describe('validatePassport', () => {
  test('single entry', () => {
    const input = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm',
      hcl: '#fffffd'
    }

    expect(validatePassport(input)).toBe(true)
  })

  test('count sample input', () => {
    const actual = parse(sample).filter(validatePassport).length
    expect(actual).toBe(2)
  })

  test('count puzzle input', () => {
    const actual = parse(puzzle).filter(validatePassport).length
    expect(actual).toBe(256)
  })
})

describe('validatePassportStrict', () => {
  test('single entry', () => {
    const input = {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm',
      hcl: '#fffffd'
    }

    expect(validatePassportStrict(input)).toBe(true)
  })

  test('count sample input', () => {
    const actual = parse(sample).filter(validatePassportStrict).length
    expect(actual).toBe(2)
  })

  test('count puzzle input', () => {
    const actual = parse(puzzle).filter(validatePassportStrict).length
    expect(actual).toBe(198)
  })
})
