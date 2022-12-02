import {DrawRequest, Letter, LooseRequest, Paper, Request, Rock, Instruction, Scissors, Shape, WinRequest} from "./types.ts";

export const loadData = (): Instruction<Letter, Letter>[] => Deno.readTextFileSync('02/input.txt')
    .split(/\n/)
    .filter(x => x)
    .map(x => x.split(' ') as Instruction<Letter, Letter>)

const isRock = (s: Shape): s is Rock => ['A', 'X'].includes(s)
const isPaper = (s: Shape): s is Paper => ['B', 'Y'].includes(s)
const isScissors = (s: Shape): s is Scissors => ['C', 'Z'].includes(s)
const isLooseRequested = (r: Request): r is LooseRequest => r === 'X'
const isDrawRequested = (r: Request): r is DrawRequest => r === 'Y'
const isWinRequested = (r: Request): r is WinRequest => r === 'Z'

const isWin = (other: Shape, mine: Shape) => (isRock(other) && isPaper(mine)) || (isPaper(other) && isScissors(mine)) || (isScissors(other) && isRock(mine))
const isLoose = (other: Shape, mine: Shape) => (isRock(other) && isScissors(mine)) || (isPaper(other) && isRock(mine)) || (isScissors(other) && isPaper(mine))

const calcWinningShapeScore = (other: Shape) => isRock(other) ? calcShapeScore('B') : isPaper(other) ? calcShapeScore('C') : calcShapeScore('A')
const calcLosingShapeScore = (other: Shape) => isRock(other) ? calcShapeScore('C') : isPaper(other) ? calcShapeScore('A') : calcShapeScore('B')
const calcDrawingShapeScore = (other: Shape) => isRock(other) ? calcShapeScore('A') : isPaper(other) ? calcShapeScore('B') : calcShapeScore('C')

const calcGameScore = (other: Shape, mine: Shape) => isWin(other, mine) ? 6 : isLoose(other, mine) ? 0 : 3
const calcShapeScore = (shape: Shape) => isRock(shape) ? 1 : isPaper(shape) ? 2 : 3
const calcGameScoreAsRequested = (request: Request) => isWinRequested(request) ? 6 : isLooseRequested(request) ? 0 : 3
const calcShapeScoreAsRequested = (other: Shape, request: Request) => isLooseRequested(request) ? calcLosingShapeScore(other)
    : isDrawRequested(request) ? calcDrawingShapeScore(other)
    : calcWinningShapeScore(other)

const sum = (a: number, b: number) => a + b

export const first = (rows: Instruction<Shape, Shape>[]) => rows.map(i => calcShapeScore(i[1]) + calcGameScore(i[0], i[1])).reduce(sum)
export const second = (rows: Instruction<Shape, Request>[]) => rows.map(i => calcShapeScoreAsRequested(i[0], i[1]) + calcGameScoreAsRequested(i[1])).reduce(sum)