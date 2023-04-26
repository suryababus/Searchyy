/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import "./App.css";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { useSpotSearch } from "./state/spot-search";
import { SearchBar } from "./components/search-bar";
import { SearchResult } from "./components/search-result";
import { useSelectedTab } from "./state/selected-tabs";
import { Button } from "baseui/button";
import { search } from "./background-script-apis/search";
import { openTabsInNewWindow } from "./background-script-apis/open-all-tabs-new-window";
import { closeTabs } from "./background-script-apis/close-tabs";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { LabelMedium } from "baseui/typography";
import { SearchResponseType } from "../background/actions";

function App() {
  const {
    visible,
    setVisibility,
    highlightedSearchResult,
    setHighlightedSearchResult,
  } = useSpotSearch();

  const { selectedTabIds, reset } = useSelectedTab();
  const [, theme] = useStyletron();

  const [searchKey, setSearchKey] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<SearchResponseType>();

  const closeSearch = useCallback(() => {
    setVisibility(false);
    setHighlightedSearchResult(0);
  }, [setHighlightedSearchResult, setVisibility]);

  const openSearch = useCallback(() => {
    setVisibility(true);
    setHighlightedSearchResult(0);
  }, [setHighlightedSearchResult, setVisibility]);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSearch();
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [
    closeSearch,
    highlightedSearchResult,
    searchResult,
    setHighlightedSearchResult,
    setVisibility,
    visible,
  ]);

  useEffect(() => {
    const searchIndex = async () => {
      const response = await search(searchKey);

      setSearchResult(response);
    };
    searchIndex();
  }, [searchKey, setHighlightedSearchResult]);

  const onOpenInNewWindowPress = () => {
    openTabsInNewWindow(selectedTabIds);
    reset();
  };
  const closeTabsPressed = async () => {
    await closeTabs(selectedTabIds);
    setTimeout(async () => {
      const response = await search(searchKey);
      setSearchResult(response);
    }, 500);
    reset();
  };

  const enableActionButtons = selectedTabIds.length > 0;

  if (!visible) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        top: "0px",
        position: "fixed",
        zIndex: 9999999999,
        backgroundColor: "#00000085",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backdropFilter: "blur(5px)",
      }}
    >
      <Block
        width={"100vw"}
        height={"100vh"}
        maxWidth={"1000px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Block width="80%" height="80%" padding={"8px"}>
          <SearchBar
            setSearchKey={setSearchKey}
            closeSearch={closeSearch}
            openSearch={openSearch}
            searchKey={searchKey}
          />
          <Block padding={"4px"} />
          {searchResult && (
            <SearchResult
              searchResult={searchResult}
              highlightedSearchResult={highlightedSearchResult}
              query={searchKey}
            />
          )}
        </Block>
        <Block
          width={"20%"}
          display={"flex"}
          flexDirection={"column"}
          gridGap={"10px"}
        >
          <Block
            backgroundColor={theme.colors.backgroundAlwaysDark}
            display={"flex"}
            gridGap={theme.sizing.scale300}
            padding={theme.sizing.scale600}
            alignItems={"center"}
          >
            <Checkbox checked={false} labelPlacement={LABEL_PLACEMENT.right} />
            <LabelMedium>Selected({selectedTabIds.length})</LabelMedium>
          </Block>
          <Button
            kind="secondary"
            onClick={closeTabsPressed}
            disabled={!enableActionButtons}
          >
            Close all
          </Button>
          <Button kind="secondary" disabled={!enableActionButtons}>
            Create new groupss
          </Button>
          <Button kind="secondary" disabled={!enableActionButtons}>
            Add all to exsiting group
          </Button>
          <Button
            kind="secondary"
            disabled={!enableActionButtons}
            onClick={onOpenInNewWindowPress}
          >
            Pull all tabs to new window
          </Button>
        </Block>
      </Block>
    </div>
  );
}

export default App;
