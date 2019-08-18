const TW = "TW",
  DL = "DL",
  DW = "DW",
  TL = "TL",
  ST = "ST"

const modifiers = {
  0: {
    0: TW,
    3: DL,
    7: TW,
    11: DL,
    14: TW,
  },
  1: {
    1: DW,
    5: TL,
    9: TL,
    13: DW,
  },
  2: {
    2: DW,
    6: DL,
    8: DL,
    12: DW,
  },
  3: {
    0: DL,
    3: DW,
    7: DL,
    11: DW,
    14: DL,
  },
  4: {
    4: DW,
    10: DW,
  },
  5: {
    1: TL,
    5: TL,
    9: TL,
    13: TL,
  },
  6: {
    2: DL,
    6: DL,
    8: DL,
    12: DL,
  },
  7: {
    0: TW,
    3: DL,
    7: ST,
    11: DL,
    14: TW,
  },
  8: {
    2: DL,
    6: DL,
    8: DL,
    12: DL,
  },
  9: {
    1: TL,
    5: TL,
    9: TL,
    13: TL,
  },
  10: {
    4: DW,
    10: DW,
  },
  11: {
    0: DL,
    3: DW,
    7: DL,
    11: DW,
    14: DL,
  },
  12: {
    2: DW,
    6: DL,
    8: DL,
    12: DW,
  },
  13: {
    1: DW,
    5: TL,
    9: TL,
    13: DW,
  },
  14: {
    0: TW,
    3: DL,
    7: TW,
    11: DL,
    14: TW,
  },
}

const letterScores = {}

function mapLetterScores(arr, int) {
  arr.forEach(char => (letterScores[char] = int))
}

mapLetterScores(["E", "A", "I", "O", "N", "R", "T", "L", "S", "U"], 1)
mapLetterScores(["D", "G"], 2)
mapLetterScores(["B", "C", "M", "P"], 3)
mapLetterScores(["F", "H", "V", "W", "Y"], 4)
mapLetterScores(["K"], 5)
mapLetterScores(["J", "X"], 8)
mapLetterScores(["Q", "Z"], 10)

const letterDistribution = [
  Array(9).fill("A"),
  Array(2).fill("B"),
  Array(2).fill("C"),
  Array(4).fill("D"),
  Array(12).fill("E"),
  Array(2).fill("F"),
  Array(3).fill("G"),
  Array(2).fill("H"),
  Array(9).fill("I"),
  Array(1).fill("J"),
  Array(1).fill("K"),
  Array(4).fill("L"),
  Array(2).fill("M"),
  Array(6).fill("N"),
  Array(8).fill("O"),
  Array(2).fill("P"),
  Array(1).fill("Q"),
  Array(6).fill("R"),
  Array(4).fill("S"),
  Array(6).fill("T"),
  Array(4).fill("U"),
  Array(2).fill("V"),
  Array(2).fill("W"),
  Array(1).fill("X"),
  Array(2).fill("Y"),
  Array(1).fill("Z"),
  Array(2).fill(""),
].reduce((a, c) => a.concat(c), [])

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

export default {
  modifiers: modifiers,
  letterDistribution: letterDistribution,
  letterScores: letterScores,
  alphabet: alphabet,
}
