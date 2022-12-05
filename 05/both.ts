export const loadData = () => Deno.readTextFileSync('05/input.txt').split(/ 1   2  /)

const parseCrates = (data: string) => data.split(/\n/).map(x => x.split(/(?:\[(.)\] ?|    ?)/gm).filter(x => x !== ''))
const initializeCrates = (rawCrates: string) => transpose(parseCrates(rawCrates)).map(m => m.filter(m => m));
const initializeInstructions = (raw: string) => raw.split(/\n/).slice(2).map(x => x.split(/move (\d+) from (\d+) to (\d+)/).filter(x => x).map(Number));
const grabCrates = (crate: string[], amount: number): string[][] => [crate.slice(0, amount), crate.slice(amount, crate.length)]
const getMaxLength = (crates: string[][]) => crates.reduce((max, {length}) => Math.max(max, length), 0);
const transpose = (crates: string[][]) => Array.from({length: getMaxLength(crates)}, (_, i) => crates.map(col => col[i]))

type CrateMover = (crates: string[]) => string[]
const move9000: CrateMover = c => c.reverse()
const move9001: CrateMover = c => c

function move(stacks: string[][], amount: number, from: number, to: number, moveCrates: CrateMover) {
    const [crates, remainingStack] = grabCrates(stacks[from], amount)

    stacks[from] = remainingStack
    stacks[to] = [...moveCrates(crates), ...stacks[to]]

    return stacks
}

function prepareExpedition([rawCrates, rawInstructions]: string[], moveCrates: CrateMover) {
    let [crates, instructions] = [initializeCrates(rawCrates), initializeInstructions(rawInstructions)]

    for (const [amount, from, to] of instructions) {
        crates = move(crates, amount, from - 1, to - 1, moveCrates)
    }

    return crates.map(c => c[0]).join('')
}

export const first = (data: string[]) => prepareExpedition(data, move9000)
export const second = (data: string[]) => prepareExpedition(data, move9001)