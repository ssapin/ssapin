import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import UserInfoDetailCard from "./UserInfoDetailCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Cards/UserInfoDetailCard",
  component: UserInfoDetailCard,
  decorators: [withRouter],
} as ComponentMeta<typeof UserInfoDetailCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof UserInfoDetailCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UserInfoDetailCard {...args} />
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
  type: "pc",
  nickname: "뭘봐",
  mapcnt: 123,
  placecnt: 2,
  participatecnt: 2414,
};
