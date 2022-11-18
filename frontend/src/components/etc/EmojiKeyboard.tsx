import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  SuggestionMode,
} from "emoji-picker-react";

interface IEmojiProps {
  emoji: string;
  length: number;
  setEmoji: (v: string) => void;
  setLength: (v: number) => void;
}

function EmojiKeyBoard({ emoji, length, setEmoji, setLength }: IEmojiProps) {
  function onClick(emojiData: EmojiClickData) {
    console.log(emojiData);

    setEmoji(emoji + emojiData.emoji);
    setLength(length + 1);
  }

  return (
    <EmojiPicker
      // eslint-disable-next-line react/jsx-no-bind
      onEmojiClick={onClick}
      autoFocusSearch
      emojiStyle={EmojiStyle.NATIVE}
      emojiVersion="5.0"
      theme={Theme.LIGHT}
      previewConfig={{
        defaultCaption: "싸핀러의 이모지는 무엇!",
        defaultEmoji: "1f92a", // 🤪
      }}
      suggestedEmojisMode={SuggestionMode.RECENT}
      defaultSkinTone={SkinTones.NEUTRAL}
      categories={[
        {
          name: "제안",
          category: Categories.SUGGESTED,
        },
        {
          name: "표정",
          category: Categories.SMILEYS_PEOPLE,
        },
        {
          name: "자연&동물",
          category: Categories.ANIMALS_NATURE,
        },
        {
          name: "음식",
          category: Categories.FOOD_DRINK,
        },
        {
          name: "여행",
          category: Categories.TRAVEL_PLACES,
        },
        {
          name: "활동",
          category: Categories.ACTIVITIES,
        },
        {
          name: "사물",
          category: Categories.OBJECTS,
        },
        {
          name: "깃발",
          category: Categories.FLAGS,
        },
      ]}
    />
  );
}

export default EmojiKeyBoard;
