import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import UpperIconPlaceDetailButton from "./ShowMoreButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/BackButton",
  component: UpperIconPlaceDetailButton,
  decorators: [withRouter],
} as ComponentMeta<typeof UpperIconPlaceDetailButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof UpperIconPlaceDetailButton> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UpperIconPlaceDetailButton />
);

export const ShowMoreButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

ShowMoreButton.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
