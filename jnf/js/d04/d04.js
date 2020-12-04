const requiredKeys = {
  byr: v => Number(v) >= 1920 && Number(v) <= 2002,
  ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  eyr: v => Number(v) >= 2020 && Number(v) <= 2030,
  iyr: v => Number(v) >= 2010 && Number(v) <= 2020,
  hcl: v => /^#[0-9A-F]{6}$/i.test(v),
  pid: v => Number(v) && String(v).length === 9,
  hgt: v => {
    const [, value, unit] = v.match(/(\d+)?(cm|in)?$/)
    return heightRestrictions[unit] && heightRestrictions[unit](Number(value))
  },
}

const heightRestrictions = {
  cm: n => n >= 150 && n <= 193,
  in: n => n >=59 && n <= 76,
}

const parse = raw => raw.split(/\n\n/)
  .reduce((acc, line) => {
    const entries = line.replace(/\n/g, ' ')
      .match(/(\w+:#?\w+)/g)
      .reduce((acc, pair) => {
        const [k, v] = pair.split(':')
        return {
          ...acc,
          [k]: v,
        }
      }, {})

    acc.push(entries)
    return acc
  }, [])

const validatePassportStrict = (passport={}) => {
  return Object.entries(requiredKeys).every(([key, validator]) => {
    return passport[key] && validator(passport[key])
  })
}

const validatePassport = (passportFields={}) => {
  const required = Object.keys(requiredKeys)
  return required.every(key => passportFields[key])
}

export {
  parse,
  validatePassport,
  validatePassportStrict,
}
