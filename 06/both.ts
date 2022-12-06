export const loadData = () => Deno.readTextFileSync('06/input.txt')

const calculateIndicesForEveryFreakingUniqueChunkInThisString = (s: string, length: number): number[] =>
    [...Array(length).keys()]
        .map(n => s.substring(n).split(new RegExp(`([a-z]{${length}})`)))
        .flat()
        .filter(isUnique)
        .map(c => s.indexOf(c) + length)
        .sort()

const isUnique = (s: string) => s && !/(.).*\1/.test(s);

export const first = (s: string) => calculateIndicesForEveryFreakingUniqueChunkInThisString(s, 4)[0]
export const second = (s: string) => calculateIndicesForEveryFreakingUniqueChunkInThisString(s, 14)[0]