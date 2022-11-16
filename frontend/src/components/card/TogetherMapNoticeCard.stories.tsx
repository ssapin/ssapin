import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import TogetherMapNoticeCard from "./TogetherMapNoticeCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Cards/TogetherMapNoticeCard",
  component: TogetherMapNoticeCard,
  decorators: [withRouter],
} as ComponentMeta<typeof TogetherMapNoticeCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof TogetherMapNoticeCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TogetherMapNoticeCard />
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
