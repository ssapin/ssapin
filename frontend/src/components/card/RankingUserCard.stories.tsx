import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import RankingUserCard from "./RankingUserCard";
import { IUserRanking } from "../../utils/types/user.interface";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Cards/RankingUserCard",
  component: RankingUserCard,
  decorators: [withRouter],
} as ComponentMeta<typeof RankingUserCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof RankingUserCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <RankingUserCard {...args} />
);

export const SwitchButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const dummmy = {
  user: IUserRanking,
};

SwitchButton.decorators = [
  (Story) => (
    <ThemeProvider theme={themes}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
