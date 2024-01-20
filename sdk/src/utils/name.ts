export const encodeName = (name: string): number[] => {
  const buffer = Buffer.alloc(32)
  buffer.fill(name)
  buffer.fill(' ', name.length)

  return Array(...buffer)
}

export const decodeName = (bytes: number[]): string => {
  const buffer = Buffer.from(bytes)
  return buffer.toString('utf8').trim()
}
