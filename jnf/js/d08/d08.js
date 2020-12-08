const part1 = (commands, acc=0, index=0) => {
  const memo = commands.reduce((acc, c, i) => ({ ...acc, [i]: 0 }), {})
  const fn = {
    nop: () => { index += 1 },
    acc: v => { acc += v; index += 1 },
    jmp: i => { index += i },
  }

  let current, arg
  while (commands[index]) { // holy shit infinite loop
    [current, arg] = commands[index].split(/\s+/)
    memo[index] += 1

    if (memo[index] > 1) return [acc, 'infinite']
    fn[current](Number(arg))
  }

  return [acc, 'fixed']
}

const part2 = original => {
  let cmd, val, mod, test, modified, flipper = 0
  while (flipper <= original.length) {
    [cmd, val] = original[flipper].split(/\s+/)
    flipper++

    if (cmd === 'acc') continue

    mod = `${cmd === 'jmp' ? 'nop' : 'jmp'} ${val}`
    modified = [...original]
    modified[flipper-1] = mod
    const [acc, outcome] = part1(modified)
    if (outcome === 'fixed') return acc
  }
}

export {
  part1,
  part2,
}
