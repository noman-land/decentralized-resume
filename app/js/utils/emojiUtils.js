const MAX_CODE_POINTS = 8;

export function emojiToCodePoints(emoji) {
  const emojiArray = [...emoji];
  return [...new Array(MAX_CODE_POINTS)]
    .map((_, i) => {
      if (!emojiArray[i]) {
        return 0;
      }
      return emojiArray[i].codePointAt();
    });
}

export function codePointsToEmoji(serializedEmoji) {
  return serializedEmoji
    .filter(cp => cp)
    .map(cp => String.fromCodePoint(cp))
    .join('');
}
