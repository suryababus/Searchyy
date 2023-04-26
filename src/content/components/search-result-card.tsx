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
import "../index.css";

type SearchResultCardProps = {
  tab: chrome.tabs.Tab;
  currentTab: chrome.tabs.Tab;
  content: string;
  query: string;
};
//<span class="fuse-highlight">

const highLightText = (text: string, highlight: string) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part?.toLowerCase() === highlight?.toLowerCase()
              ? { fontWeight: "bold", backgroundColor: "#2a7034" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export function SearchResultCard(
  searchResultCardProps: SearchResultCardProps
): JSX.Element {
  const { tab, currentTab, content, query } = searchResultCardProps;
  const { selectedTabIds, addSelectedTab, removeSelectedTab } =
    useSelectedTab();
  const { setVisibility } = useSpotSearch();

  const onGoToTabClick = async (tabID: number) => {
    await goToTab(tabID);
    setVisibility(false);
  };

  let titleHtml = <>{highLightText(tab?.title || "", query)}</>;
  let urlHtml = <>{highLightText(tab?.url || "", query)}</>;
  let contentHtmlText = <>{highLightText(content || "", query)}</>;

  return (
    <Block>
      <Card>
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
            $style={{
              display: "block",
              overflow: "hidden",
              maxHeight: "1.8em",
              lineHeight: "1.8em",
            }}
          >
            {titleHtml}
          </LabelXSmall>
        </Block>
        <ParagraphXSmall
          marginTop={"4px"}
          marginBottom="0px"
          onDrag={(V: any) => {}}
          $style={{
            display: "block",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "1.8em",
            lineHeight: "1.8em",
          }}
        >
          {urlHtml}
        </ParagraphXSmall>

        <ParagraphXSmall
          marginTop={"8px"}
          marginBottom="0px"
          onDrag={(V: any) => {}}
          $style={{
            display: "block",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "3.6em",
            lineHeight: "1.8em",
          }}
        >
          {contentHtmlText}
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
