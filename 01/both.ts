export const loadData = (): number[][] => Deno.readTextFileSync('01/input.txt').split(/\n\n/).map(x => x.split(/\n/).map(Number))

const highest = (a: number, b: number) => b - a
const sum = (n: number[]) => n.reduce((a, b) => a + b)
const sumOfTop3 = (n: number[]) => sum(n.slice(0, 3))
const sortHighest = (n: number[][]) => n.map(sum).sort(highest)

export const first = (provision: number[][]) => sortHighest(provision)[0]
export const second = (provision: number[][]) => sumOfTop3(sortHighest(provision))