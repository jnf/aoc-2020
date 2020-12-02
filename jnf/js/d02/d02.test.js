import fs from 'fs'
import { parseLine, validateAgain, validatePassword } from './d02'

describe('utility', () => {
  test('parseLine', () => {
    const expected = { letter: 'a', password: 'abcde', n1: 1, n2: 3 }
    const actual = parseLine('1-3 a: abcde')
    expect(actual).toStrictEqual(expected)
  })
})

describe('dev input', () => {
  test('validatePassword', () => {
    expect(validatePassword('1-3 a: abcde')).toBe(true)
    expect(validatePassword('1-3 b: cdefg')).toBe(false)
    expect(validatePassword('2-9 c: ccccccccc')).toBe(true)
  })

  test('validateAgain', () => {
    expect(validateAgain('1-3 a: abcde')).toBe(true)
    expect(validateAgain('1-3 b: cdefg')).toBe(false)
    expect(validateAgain('2-9 c: ccccccccc')).toBe(false)
  })
})

describe('puzzle input', () => {
  test('validatePassword', () => {
    const passwords = fs.readFileSync('./d02/d02.input.txt', 'utf8')
    const outcomes = passwords.split(/\n/).reduce((counts, password) => {
      const outcome = validatePassword(password)
      counts[outcome] += 1
      return counts
    }, { false: 0, true: 0, undefined: 0 })

    expect(outcomes[true]).toBe(500)
  })

  test('validateAgain', () => {
    const passwords = fs.readFileSync('./d02/d02.input.txt', 'utf8')
    const outcomes = passwords.split(/\n/).reduce((counts, password) => {
      const outcome = validateAgain(password)
      counts[outcome] += 1
      return counts
    }, { false: 0, true: 0, undefined: 0 })

    expect(outcomes[true]).toBe(313)
  })
})
