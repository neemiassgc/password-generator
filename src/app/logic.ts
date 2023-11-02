export interface FlagMap {
  [index: string]: boolean;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePassword(flagMap: FlagMap, length: number): string {
  interface CharSetMap {
    [index: string]: string[] | number[]
    lowercase: string[],
    uppercase: string[],
    numbers: number[],
    symbols: string[]
  }
  const charSetMapping: CharSetMap = {
    lowercase: [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ç"
    ],
    uppercase: [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
      "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"
    ],
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    symbols: ["!", "@", "$", "#", "$", "&", "*", "=", "+", "-", "_", "?", ":", ";"]
  }

  const selectedCharSet: string[] = selectCharSet(flagMap);
  let passwordBuilder: string = "";

  for (let i = 0; i < length; i++) {
      const charSetKey: number = randomNumber(selectedCharSet.length);
      const charSet: string[] | number[] = charSetMapping[charSetKey]
      const charSetIndex: number = randomNumber(charSet.length);
      passwordBuilder += charSet[charSetIndex];
  }

  return passwordBuilder;
}

function selectCharSet(flagMap: FlagMap): string[] {
  const charSetSelectionBuilder: string[] = [];

  for (const key in flagMap)
    if (flagMap[key]) charSetSelectionBuilder.push(key)

  return charSetSelectionBuilder;
}

function randomNumber(size: number): number {
  return Math.round(Math.random() * size)
}