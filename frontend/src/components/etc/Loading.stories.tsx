import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import Loading from "./Loading";

export default {
  title: "Components/etc/Loading",
  component: Loading,
  decorators: [withRouter],
} as ComponentMeta<typeof Loading>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Loading> = () => <Loading />;

export const LoadingComponent = Template.bind({});

LoadingComponent.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
