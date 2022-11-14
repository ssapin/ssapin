import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
} from "emoji-picker-react";
import { useState } from "react";

function EmojiKeyBoard() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    // <div className="App">
    //   <h2>Emoji Picker React 4 Demo</h2>
    //   <div className="show-emoji">
    //     Your selected Emoji is:
    //     {selectedEmoji ? (
    //       <Emoji
    //         unified={selectedEmoji}
    //         emojiStyle={EmojiStyle.NATIVE}
    //         size={22}
    //       />
    //     ) : null}
    //   </div>

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
    // </div>
  );
}

export default EmojiKeyBoard;
