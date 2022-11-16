import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import TogetherMapTitleCard from "./TogetherMapTitleCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Cards/TogetherMapTitleCard",
  component: TogetherMapTitleCard,
  decorators: [withRouter],
} as ComponentMeta<typeof TogetherMapTitleCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof TogetherMapTitleCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TogetherMapTitleCard {...args} />
);

export const SwitchButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

SwitchButton.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

SwitchButton.args = {
  title: "개별로야",
};
