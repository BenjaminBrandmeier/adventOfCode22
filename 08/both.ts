export const loadData = (): string[] => Deno.readTextFileSync('08/input.txt').split(/\n/)

const getVertical = (line: string, y: number, data: string[], x: number) => line.split('').reduce((acc, _, i = y) => acc + data[i][x], '')
const isVisible = (trees: string, tree: string) => trees.split('').reduce((acc, b) => +b >= +tree ? false : acc, true)

const getSurroundingTrees = (line: string, x: number, y: number, data: string[]) => ({
    right: line.substring(x + 1, line.length),
    left: line.substring(0, x).split('').reverse().join(''),
    down: getVertical(line, y, data, x).substring(y + 1, line.length),
    top: getVertical(line, y, data, x).substring(0, y).split('').reverse().join('')
})

function calculateVisibleTrees(line: string, x: number, y: number, data: string[], tree: string, counter: number) {
    const {right, left, down, top} = getSurroundingTrees(line, x, y, data)
    return [right, left, down, top].some(path => isVisible(path, tree)) ? counter + 1 : counter
}

function calculateScenicScore(trees: string, currentTree: string, score = 0) {
    trees.split('').some(nearbyTree => score++ && Number(nearbyTree) >= Number(currentTree))
    return score
}

function calculateHighestScenicScore(line: string, x: number, y: number, data: string[], tree: string, score: number) {
    const {right, left, down, top} = getSurroundingTrees(line, x, y, data)
    const newScenicScore = [right, left, down, top].reduce((acc, path) => acc * Number(calculateScenicScore(path, tree)), 1)
    return Math.max(newScenicScore, score)
}

function analyseForest(forest: string[], calculateTrees: Function, counter = 0) {
    forest.forEach((line: string, y: number) =>
        line.split('').forEach((tree: string, x: number) =>
            counter = calculateTrees(line, x, y, forest, tree, counter)))

    return counter
}

export const first = (forest: string[]) => analyseForest(forest, calculateVisibleTrees)
export const second = (forest: string[]) => analyseForest(forest, calculateHighestScenicScore)