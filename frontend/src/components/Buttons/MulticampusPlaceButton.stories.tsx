import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";

import MulticampusPlaceButton from "./MulticampusPlaceButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/BackButton",
  component: MulticampusPlaceButton,
  decorators: [withRouter],
} as ComponentMeta<typeof MulticampusPlaceButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof MulticampusPlaceButton> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MulticampusPlaceButton {...args} />
);

export const MultiCampusButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

MultiCampusButton.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
