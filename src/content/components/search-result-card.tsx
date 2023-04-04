import { useStyletron } from "baseui";
import { Avatar } from "baseui/avatar";
import { Badge, COLOR } from "baseui/badge";
import { Block } from "baseui/block";
import { Card } from "baseui/card";
import { LabelXSmall, ParagraphXSmall } from "baseui/typography";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { useSelectedTab } from "../state/selected-tabs";
import { Button } from "baseui/button";
import { goToTab } from "../background-script-apis/go-to-tab";
import { useSpotSearch } from "../state/spot-search";

type SearchResultCardProps = {
  index: number;
  tab: chrome.tabs.Tab;
  currentTab: chrome.tabs.Tab;
};

export function SearchResultCard(
  searchResultCardProps: SearchResultCardProps
): JSX.Element {
  const { index, tab, currentTab } = searchResultCardProps;
  const [, theme] = useStyletron();
  const { selectedTabIds, addSelectedTab, removeSelectedTab } =
    useSelectedTab();
  const highlightedSearchResult = 0;
  const { setVisibility } = useSpotSearch();

  const onGoToTabClick = async (tabID: number) => {
    await goToTab(tabID);
    setVisibility(false);
  };

  return (
    <Block key={index}>
      <Card
        overrides={{
          Root: {
            style: ({ $theme }) => {
              if (index !== highlightedSearchResult - 1) return {};
              return {
                backgroundColor: $theme.colors.accent,
              };
            },
          },
        }}
      >
        <Block display={"flex"}>
          <Block flex={"1"}>
            <Block
              marginBottom={"10px"}
              display={"flex"}
              flexDirection={"row"}
              gridGap={"5px"}
            >
              {currentTab.id === tab?.id && (
                <Badge content="Current Tab" color={COLOR.positive} />
              )}
              {currentTab.windowId === tab?.windowId && (
                <Badge content="Current Window" color={COLOR.positive} />
              )}
            </Block>
          </Block>
          <Checkbox
            checked={selectedTabIds.includes(tab?.id || 0)}
            onChange={(e) => {
              if (e.target.checked) {
                addSelectedTab(tab?.id || 0);
              } else {
                removeSelectedTab(tab?.id || 0);
              }
            }}
            labelPlacement={LABEL_PLACEMENT.right}
          />
        </Block>
        <Block display={"flex"} alignItems={"center"}>
          <Avatar name="Jane Doe" size="scale800" src={tab.favIconUrl} />
          <LabelXSmall
            marginLeft={"4px"}
            overflow={"auto"}
            color={
              index !== highlightedSearchResult - 1 ? "" : theme.colors.white
            }
            $style={{
              display: "block",
              textOverflow: "ellipsis",
              wordWrap: "break-word",
              overflow: "hidden",
              maxHeight: "1.8em",
              lineHeight: "1.8em",
            }}
          >
            {tab?.title}
          </LabelXSmall>
        </Block>
        <ParagraphXSmall
          marginTop={"4px"}
          marginBottom="0px"
          color={
            index !== highlightedSearchResult - 1
              ? theme.colors.accent
              : theme.colors.white
          }
          $style={{
            display: "block",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "1.8em",
            lineHeight: "1.8em",
          }}
        >
          {tab?.url}
        </ParagraphXSmall>
        <Block display={"flex"} alignItems="end" justifyContent={"end"}>
          <Button
            size="mini"
            kind="secondary"
            onClick={() => onGoToTabClick(tab.id || 0)}
          >
            Go to tab
          </Button>
        </Block>
      </Card>
      <Block padding={"4px"} />
    </Block>
  );
}
