import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import EmojiSlotMachine from "./EmojiSlotMachine";

export default {
  title: "Components/EmojiSlotMachine",
  component: EmojiSlotMachine,
  decorators: [withRouter],
} as ComponentMeta<typeof EmojiSlotMachine>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof EmojiSlotMachine> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <EmojiSlotMachine />
);

export const RandomButton = Template.bind({});

RandomButton.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
