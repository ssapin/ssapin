import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import SkeletonCard from "./SkeletonCard";

export default {
  title: "Components/Cards/SkeletonCard",
  component: SkeletonCard,
  decorators: [withRouter],
} as ComponentMeta<typeof SkeletonCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof SkeletonCard> = () => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <SkeletonCard />
);

export const SkeletonUICard = Template.bind({});

SkeletonUICard.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
