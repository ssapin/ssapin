import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from "emoji-picker-react";
import { useState } from "react";

function EmojiKeyBoard() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    <div className="App">
      <h2>Emoji Picker React 4 Demo</h2>
      <div className="show-emoji">
        Your selected Emoji is:
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div>

      <EmojiPicker
        // eslint-disable-next-line react/jsx-no-bind
        onEmojiClick={onClick}
        autoFocusSearch={false}
        // theme={Theme.AUTO}
        // searchDisabled
        // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
        // height={350}
        // width="50%"
        // emojiVersion="0.6"
        // lazyLoadEmojis={true}
        // previewConfig={{
        //   defaultCaption: "Pick one!",
        //   defaultEmoji: "1f92a" // 🤪
        // }}
        // suggestedEmojisMode={SuggestionMode.RECENT}
        // skinTonesDisabled
        // searchPlaceHolder="Filter"
        // defaultSkinTone={SkinTones.MEDIUM}
        // emojiStyle={EmojiStyle.NATIVE}
        // categories={[
        //   {
        //     name: "Fun and Games",
        //     category: Categories.ACTIVITIES
        //   },
        //   {
        //     name: "Smiles & Emotions",
        //     category: Categories.SMILEYS_PEOPLE
        //   },
        //   {
        //     name: "Flags",
        //     category: Categories.FLAGS
        //   },
        //   {
        //     name: "Yum Yum",
        //     category: Categories.FOOD_DRINK
        //   }
        // ]}
      />
    </div>
  );
}

export default EmojiKeyBoard;
