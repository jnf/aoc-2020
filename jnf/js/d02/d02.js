const parseLine = (line='') => { // line is something like '1-3 a: abcde'
  const [ range, letter, password ] = line.split(/\s+/)
  const [n1, n2] = range.split('-').map(Number)
  return { password, letter: letter[0], n1, n2 }
}

const validatePassword = (line='') => {
  if (line === '') return undefined

  const { password, letter, n1:min, n2:max } = parseLine(line)
  const map = password.split('').reduce((acc, letter) => ({...acc, [letter]: (acc[letter] || 0) + 1 }), {})

  return map[letter] >= min && map[letter] <= max
}

const validateAgain = (line = '') => {
  if (line === '') return undefined
  const { password, letter, n1, n2 } = parseLine(line)
  const match1 = password[n1-1]
  const match2 = password[n2-1]

  if (match1 === match2) return false
  return (letter === match1 || letter === match2)
}

export {
  parseLine,
  validateAgain,
  validatePassword,
}
