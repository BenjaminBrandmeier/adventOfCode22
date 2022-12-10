export const loadData = () => Deno.readTextFileSync('10/input.txt').split(/\n/).map(x => x.split(/ /))

type Instruction = [string, number]

const draw = (cycle: number, X: number) =>
    ((cycle % 40) - 1 >= X - 1 && (cycle % 40) - 1 <= X + 1) ? '#' : ' ';

const increaseRegister = (counter: number, [command, amount]: Instruction, X: number) =>
    counter == 0 && command === 'addx' ? X + Number(amount) : X;

function startCycle(counter: number, instructions: Instruction[], instruction: Instruction): [number, Instruction] {
    if (counter == 0 && instructions[0]) {
        instruction = instructions.shift()!
        switch (instruction[0]) {
            case 'noop':
                return [0, instruction]
            case 'addx':
                return [1, instruction]
        }
    }
    return [counter - 1, instruction];
}

function endCycle(cycle: number, cycleLength: number, sumOfSignalStrengths: number, X: number, crt: string[][], row: string[]): [number, string[]] {
    if (cycle % 40 === cycleLength) {
        sumOfSignalStrengths = sumOfSignalStrengths + (cycle * X)
        crt.push(row)
        row = []
    }
    return [sumOfSignalStrengths, row];
}

function execute(data: Instruction[], cycleLength: number) {
    let X = 1, counter = 0, instruction: Instruction = ['', 0], sumOfSignalStrengths = 0, row: string[] = [];
    const crt: string[][] = []

    for (let cycle = 1; cycle <= 250; cycle++) {
        [counter, instruction] = startCycle(counter, data, instruction);
        row[cycle % 40] = draw(cycle, X);
        [sumOfSignalStrengths, row] = endCycle(cycle, cycleLength, sumOfSignalStrengths, X, crt, row);
        X = increaseRegister(counter, instruction, X);
    }

    return {sumOfSignalStrengths, crt: crt}
}

export const first = (data: Instruction[]) => execute(data, 20).sumOfSignalStrengths
export const second = (data: Instruction[]) => execute(data, 0).crt.map(row => row.join(' '))