import { ThemeProvider } from "@emotion/react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import GlobalStyle from "../../styles/GlobalStyle";
import themes from "../../styles/theme";
import TogetherMapCard from "./TogetherMapCard";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

export default {
  title: "Components/Cards/TogetherMapCard",
  component: TogetherMapCard,
  decorators: [withRouter],
} as ComponentMeta<typeof TogetherMapCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof TogetherMapCard> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <TogetherMapCard {...args} />
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

const dummy: ITogetherMap = {
  title: "πͺπͺπ¨μ°λ¦¬λ€μ μ² λ¬Όμ μ κ΅¬ν΄μ£ΌμΈμπͺπͺπ¨",
  emoji: "πͺπͺπ¨",
  question: "γ",
  campusId: 1,
  userCnt: 31221412,
  placeList: [],
  togethermapId: 1,
};

SwitchButton.args = {
  prop: dummy,
};
