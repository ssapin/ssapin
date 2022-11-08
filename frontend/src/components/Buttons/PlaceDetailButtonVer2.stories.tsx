import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import UpperIconPlaceDetailButton from "./PlaceDetailButtonVer2";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/BackButton",
  component: UpperIconPlaceDetailButton,
  decorators: [withRouter],
} as ComponentMeta<typeof UpperIconPlaceDetailButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof UpperIconPlaceDetailButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UpperIconPlaceDetailButton {...args} />
);

export const PlaceButton2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

PlaceButton2.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

PlaceButton2.args = {
  emoji: "🎃",
  text: "바나프레소 멀티캠퍼스점",
};
