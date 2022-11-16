import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import UserOpinionCard from "./UserOpinionCard";
import { IReview } from "../../utils/types/review.interface";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Cards/UserOpinionCard",
  component: UserOpinionCard,
  decorators: [withRouter],
} as ComponentMeta<typeof UserOpinionCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof UserOpinionCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UserOpinionCard {...args} />
);

export const SwitchButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

SwitchButton.decorators = [
  (Story) => (
    <RecoilRoot>
      <ThemeProvider theme={themes}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </RecoilRoot>
  ),
];

const dummy: IReview = {
  reviewId: 1,
  emojiType: 1,
  content: "뭘바 이자식아",
  userId: 3,
};

SwitchButton.args = {
  review: dummy,
};
