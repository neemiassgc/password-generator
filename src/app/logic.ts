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
      const charSetIndex: number = randomNumber(selectedCharSet.length);
      const charSetKey: string = selectedCharSet[charSetIndex];
      const charSet: string[] | number[] = charSetMapping[charSetKey]
      const charIndex: number = randomNumber(charSet.length);
      passwordBuilder += charSet[charIndex];
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
  return Math.floor(Math.random() * size)
}

export function isThereOnlyOneFlagSelected(flagKeys: boolean[]): boolean {
  return verifySelectedFlagsCount(flagKeys, 1);
}

export type Indicator = "TOO WEAK" | "WEAK" | "MODERATE" | "STRONG" | "VERY STRONG" | "IMPOSSIBLE TO CRACK"

export function detectStrengthIndicator(flagKeys: boolean[], length: number): Indicator {
  if (verifySelectedFlagsCount(flagKeys, 1)) return withOneCharSetSelected(length);
  if (verifySelectedFlagsCount(flagKeys, 2)) return withTwoCharSetsSelected(length);
  if (verifySelectedFlagsCount(flagKeys, 3)) return withThreeCharSetsSelected(length);
  if (verifySelectedFlagsCount(flagKeys, 4)) return withAllCharSetsSelected(length);
  return "IMPOSSIBLE TO CRACK";
}

function withOneCharSetSelected(length: number): Indicator {
  if (length <= 8) return "TOO WEAK";
  if (length >= 9 && length <= 14) return "WEAK";
  if (length >= 15 && length <= 20) return "MODERATE";
  else return "STRONG";
}

function withTwoCharSetsSelected(length: number): Indicator {
  if (length <= 5) return "TOO WEAK";
  if (length >= 6 && length <= 10) return "WEAK";
  if (length >= 11 && length <= 17) return "MODERATE";
  else return "STRONG";
}

function withThreeCharSetsSelected(length: number): Indicator {
  if (length <= 5) return "WEAK";
  if (length >= 6 && length <= 10) return "MODERATE";
  if (length >= 11 && length <= 17) return "STRONG";
  else return "VERY STRONG";
}

function withAllCharSetsSelected(length: number): Indicator {
  if (length <= 5) return "WEAK";
  if (length >= 6 && length <= 8) return "STRONG";
  if (length >= 9 && length <= 22) return "VERY STRONG";
  else return "IMPOSSIBLE TO CRACK";
}

function verifySelectedFlagsCount(flagKeys: boolean[], count: number): boolean {
  let selectedFlagsCount = 0;
  for (let flag of flagKeys)
    if (flag) selectedFlagsCount++;
  return selectedFlagsCount === count;
}

export function toSnakeCase(input: string): string {
  const parts: string[] = input.toLowerCase().split(" ");
  return parts.join("_");
}