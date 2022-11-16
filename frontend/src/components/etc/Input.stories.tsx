import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import Input from "./Input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/etc/Input",
  component: Input,
  decorators: [withRouter],
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Input> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Input {...args} />
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
  width: "100",
  height: "100",
  placeholder: "멀바이자식아",
};
