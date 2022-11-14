import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import Random from "./Random";

export default {
  title: "Components/Random",
  component: Random,
  decorators: [withRouter],
} as ComponentMeta<typeof Random>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Random> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Random />
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
