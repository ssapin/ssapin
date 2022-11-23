import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import Input from "./Input";

export default {
  title: "Components/etc/Input",
  component: Input,
  decorators: [withRouter],
} as ComponentMeta<typeof Input>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Input> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Input {...args} />
);

export const SwitchButton = Template.bind({});

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
