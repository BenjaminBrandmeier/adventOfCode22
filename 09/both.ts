type Instruction = [direction: string, distance: string]
type Knot = [y: number, x: number]

export const loadData = (): Instruction[] => Deno.readTextFileSync('09/input2.txt')
    .split(/\n/).map(x => x.split(/(.)\ (\d+)/).filter(x => x)) as Instruction[]

const maxLength = 500
const initGrid = () => [...Array(maxLength)].map(_ => Array(maxLength).fill('.'))
const isTouching = (head: Knot, tail: Knot) => Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1
const calcMoveDistance = (num: number) => Math.max(-1, Math.min(1, num));
const moveHead = (instruction: Instruction, knots: Knot[]): Knot =>
      instruction[0] === 'R' ? [knots[0][0], knots[0][1] + 1]
    : instruction[0] === 'U' ? [knots[0][0] - 1, knots[0][1]]
    : instruction[0] === 'L' ? [knots[0][0], knots[0][1] - 1]
    : instruction[0] === 'D' ? [knots[0][0] + 1, knots[0][1]]
    : undefined;

const move = (grid: string[][], instruction: Instruction, knots: Knot[]) => {
    [...new Array(+instruction[1])].forEach(_ => {
        knots[0] = moveHead(instruction, knots);

        knots.forEach((currentKnot, index) => {
            const previousKnot = knots[index - 1]
            if (index > 0 && !isTouching(previousKnot, currentKnot)) {
                knots[index] = closeDistance(previousKnot, currentKnot)
            }
        })

        grid[knots[knots.length - 1][0]][knots[knots.length - 1][1]] = '#'
    })

    return knots
}

const closeDistance = (head: [y: number, x: number], tail: [y: number, x: number]) => {
    const distance = [head[0] - tail[0], head[1] - tail[1]]

    const moveToCloseDistance = distance.map(calcMoveDistance)
    tail = [tail[0] + moveToCloseDistance[0], tail[1] + moveToCloseDistance[1]]
    return tail
}

const playSnake = (instructions: Instruction[], snakeLength: number) => {
    const grid = initGrid()
    const knots: Knot[] = Array(snakeLength).fill([maxLength / 2, maxLength / 2])

    instructions.forEach(instruction => move(grid, instruction, knots))

    return grid.map(x => x.filter(m => m === '#').length).reduce((a, b) => a + b)
}

export const first = (instructions: Instruction[]) => playSnake(instructions, 2)
export const second = (instructions: Instruction[]) => playSnake(instructions, 10)