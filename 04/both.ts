export const loadData = (): number[][][] => Deno.readTextFileSync('04/input.txt').split(/\n/).map(x => x.split(/,/).map(x => x.split(/-/).map(Number)))

const isFullyInside = ([[a1, a2], [b1, b2]]: number[][]) => (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2)
const isPartlyInside = ([[a1, a2], [b1, b2]]: number[][]) => !(a1 > b2 || a2 < b1)

export const first = (pairs: number[][][]) => pairs.filter(isFullyInside).length
export const second = (pairs: number[][][]) => pairs.filter(isPartlyInside).length