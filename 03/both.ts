export const loadData = (): string[] => Deno.readTextFileSync('03/input.txt').split(/\n/).filter(x => x)

type Tripelizer = (groupedRucksacks: number[][][], _: number[], index: number, original: number[][]) => number[][][]

const sum = (a: number, b: number) => a + b
const toNumber = (r: string[]) => r.map(b => b.split('').map(m => m === m.toLowerCase() ? m.charCodeAt(0) - 96 : m.charCodeAt(0) - 38))
const findBadge = (r: number[][]) => r[0].find(m => r[1].includes(m) && (!r[2] || r[2].includes(m)))!
const splitRucksacks = (r: string[]) => r.map(s => [s.substring(0, s.length / 2), s.substring(s.length / 2, s.length)])
const groupTriples : Tripelizer = (g, _, i, o) => i % 3 === 0 ? [...g, [...o].splice(i, i + 3)] : g

export const first = (rucksacks: string[]) => splitRucksacks(rucksacks).map(toNumber).map(findBadge).reduce(sum)
export const second = (rucksacks: string[]) => toNumber(rucksacks).reduce(groupTriples, []).map(findBadge).reduce(sum)