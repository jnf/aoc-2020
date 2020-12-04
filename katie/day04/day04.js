const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf8')
  .split("\n\n")
  .reduce((lines, line) => {
    lines.push(line.split(/[\s\n]/).reduce((acc, entry) => {
      const info = entry.split(':')
      acc[info[0]] = info[1]
      return acc
    }, {}))
    return lines
  }, [])

const isInRange = (val, min, max) => {
  return Number(val) >= min && Number(val) <= max
}

const requiredFields = {
  "byr": { isValid: (val) => val.length === 4 && isInRange(val, 1920, 2002) },
  "iyr": { isValid: (val) => val.length === 4 && isInRange(val, 2010, 2020) },
  "eyr": { isValid: (val) => val.length === 4 && isInRange(val, 2020, 2030) },
  "hcl": { isValid: (val) => val.match(/^#[a-f0-9]{6}$/) },
  "ecl": { isValid: (val) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val) },
  "pid": { isValid: (val) => val.match(/^\d{9}$/) },
  "hgt": { isValid: (val) => {
    const height = val.match(/(\d*)(cm|in)/)
    if (!height) return false

    return height[2] === "cm"
      ? isInRange(height[1], 150, 193)
      : isInRange(height[1], 59, 76)
  }},
}

const validPassport = (passport, validateData) => {
  const presentFields = Object.keys(passport)
  if (presentFields.length < Object.keys(requiredFields).length) return false

  const missingField = Object.keys(requiredFields).find(field => !presentFields.includes(field))
  if (missingField) return false

  if (!validateData) return !Boolean(missingField)

  return !Object.keys(requiredFields).find(field => !requiredFields[field].isValid(passport[field]))
}

const validPassportCount = (passports, validateData) => {
  let validCount = 0
  passports.forEach(passport => {
    if (validPassport(passport, validateData)) { validCount++ }
  })

  return validCount
}

console.log("Part 1:", validPassportCount(input, false))
console.log("Part 2:", validPassportCount(input, true))
