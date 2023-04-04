import { Block } from "baseui/block";
import { SearchResultCard } from "./search-result-card";
import React from "react";
import { Tabs, Tab } from "baseui/tabs-motion";

type TabGroup = {
  name: string;
  urls: string[];
};

export type SearchResultProps = {
  tabs: chrome.tabs.Tab[];
  tabGroups: TabGroup[];
  currentTab: chrome.tabs.Tab;
};

type Props = {
  searchResult: SearchResultProps;
  highlightedSearchResult: number;
};

export function SearchResult(props: Props) {
  const { searchResult } = props;
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }}
      activateOnFocus
      fill="fixed"
    >
      <Tab title={`Open Tabs (${searchResult.tabs.length})`}>
        <Block maxHeight={"70vh"} width={"100%"} overflow={"scroll"}>
          {searchResult.tabs.length > 0 &&
            searchResult.tabs.map((tab, index) => (
              <SearchResultCard
                index={tab.id || 0}
                tab={tab}
                currentTab={searchResult.currentTab}
              />
            ))}
        </Block>
      </Tab>
      <Tab title="Closed Tabs">Content 2</Tab>
      <Tab title="Tab Groups">Content 3</Tab>
      <Tab title="Bookmarks">Book marks</Tab>
    </Tabs>
  );
}
