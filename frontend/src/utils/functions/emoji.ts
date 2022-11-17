export const countEmojis = (emojiString: string) => {
  return ((emojiString || "").match(REGEXES.EMOJI_PATTERN) || []).length;
};
