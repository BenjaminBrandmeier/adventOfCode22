export const loadData = (): string => Deno.readTextFileSync('07/input.txt')
const readBashScriptOutput = () => Deno.readTextFileSync('07/output.txt').split(/\n\n/)
const calcSumOfBigDirectories = (directorySizes: number[]) => directorySizes.reduce((acc, b) => b < 100000 ? acc + b : acc, 0)

function saveInputAsBashScript(loadedData: string) {
    const script = 'mkdir -p start && cd start && export START=$(pwd)\n' +
        loadedData
            .replace(/(\d+) (.*)/g, "touch $2__$1")
            .replace(/dir (\w+)/g, "mkdir -p $1")
            .replace(/cd \//g, "cd $START")
            .replace(/\$ (.*)/g, "$1") +
        '\ncd $START\n' +
        'ls -a $START/**/* > $START/../output.txt'

    Deno.writeTextFileSync('07/script.sh', script)
}

function calcDirectorySizes(directoryStructure: string[]) {
    const allFiles = directoryStructure[0].split(/\n/).map(f => ({
        dir: f.split(/.*start\/(.+)__(\d+)/gm)[1],
        size: +f.split(/.*start\/(.+)__(\d+)/gm)[2]
    }))
    const allDirectories = new Set(directoryStructure.slice(1).map(d => d.split(/(?:.*start\/)(.*)(?:\:)/)[1]).flat())

    return [...allDirectories].map(d => allFiles.reduce((acc, f) => f.dir.includes(d + '/') ? acc + f.size : acc, 0))
}

function findDirectoryToBeDeleted(directorySizes: number[], readFilesystem: string[]) {
    const currentTotalSize = readFilesystem[0].split(/\n/).map(x => +x.split(/__(\d+)/)[1]).reduce((acc, b) => acc + b, 0)
    const amountOfSpaceToBeFreed = 30000000 - (70000000 - currentTotalSize)

    return directorySizes.filter(directorySize => directorySize > amountOfSpaceToBeFreed).sort((a, b) => a - b)[0]
}

function run(executableInput: string) {
    saveInputAsBashScript(executableInput)
    return calcDirectorySizes(readBashScriptOutput())
}

export const first = (executableInput: string) => calcSumOfBigDirectories(run(executableInput))
export const second = (executableInput: string) => findDirectoryToBeDeleted(run(executableInput), readBashScriptOutput())