export const MaxBodyParts = 6;

// TODO: improve if necessary
export function calcNumberGuessesForWordLength(len, defaultLen = MaxBodyParts) {
  if (len < defaultLen) {
    return defaultLen;
  }

  let inc = defaultLen / 2;

  let diff = len - defaultLen;
  let value = defaultLen;

  while (diff >= inc) {
    value += inc;
    diff -= inc;
  }

  return value;
}
