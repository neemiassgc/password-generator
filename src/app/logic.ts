export type CharOptions = {
  [prop: string]: boolean,
  lowercase: boolean,
  uppercase: boolean,
  numbers: boolean,
  special: boolean,
}

export function generatePassword(charOptions: CharOptions, length: number): string {
  type CharPool = {
    [index: string]: string[] | number[]
    lowercase: string[],
    uppercase: string[],
    numbers: number[],
    special: string[]
  }
  const charTypeSet: CharPool = {
    lowercase: [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
      "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ç"
    ],
    uppercase: [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
      "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç"
    ],
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    special: ["!", "@", "$", "#", "$", "&", "*", "=", "+", "-", "_", "?", ":", ";"]
  }

  const selectedCharOptions: string[] = selectCharOptions(charOptions);
  let passwordBuilder: string = "";

  for (let i = 0; i < length; i++) {
      const charSetIndex: number = randomNumber(selectedCharOptions.length);
      const charSetKey: string = selectedCharOptions[charSetIndex];
      const charSet: string[] | number[] = charTypeSet[charSetKey]
      const charIndex: number = randomNumber(charSet.length);
      passwordBuilder += charSet[charIndex];
  }

  return passwordBuilder;
}

function selectCharOptions(charOptions: CharOptions): string[] {
  const charSetSelectionBuilder: string[] = [];

  for (const key in charOptions)
    if (charOptions[key]) charSetSelectionBuilder.push(key)

  return charSetSelectionBuilder;
}

function randomNumber(size: number): number {
  return Math.floor(Math.random() * size)
}
