import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import BackButton from "./BackButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/BackButton",
  component: BackButton,
  decorators: [withRouter],
} as ComponentMeta<typeof BackButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof BackButton> = () => <BackButton />;

export const Button = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Button.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
