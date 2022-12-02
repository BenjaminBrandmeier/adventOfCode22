export type Rock = 'A' | 'X'
export type Paper = 'B' | 'Y'
export type Scissors = 'C' | 'Z'
export type Shape = Rock | Paper | Scissors

export type LooseRequest = 'X'
export type DrawRequest = 'Y'
export type WinRequest = 'Z'
export type Request = LooseRequest | DrawRequest | WinRequest

export type Letter = Shape | Request

export type Instruction<First extends Letter, Second extends Letter> = [First, Second]
