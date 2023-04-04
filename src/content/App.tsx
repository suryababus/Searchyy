/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, DarkTheme } from "baseui";
import { Block } from "baseui/block";
import { useSpotSearch } from "./state/spot-search";
import { SearchBar } from "./components/search-bar";
import { SearchResult, SearchResultProps } from "./components/search-result";
import { useSelectedTab } from "./state/selected-tabs";
import { Button } from "baseui/button";
import { search } from "./background-script-apis/search";
import { openTabsInNewWindow } from "./background-script-apis/open-all-tabs-new-window";
import { closeTabs } from "./background-script-apis/close-tabs";

const iframeClassName = "my-iframe-body";
const engine = new Styletron({ prefix: `${iframeClassName}` });

function App() {
  const {
    visible,
    setVisibility,
    highlightedSearchResult,
    setHighlightedSearchResult,
  } = useSpotSearch();

  const { selectedTabIds, reset } = useSelectedTab();

  const [searchKey, setSearchKey] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<SearchResultProps>();

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
      <StyletronProvider value={engine}>
        <BaseProvider theme={DarkTheme}>
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
                />
              )}
            </Block>
            {selectedTabIds.length > 0 && (
              <Block
                width={"20%"}
                display={"flex"}
                flexDirection={"column"}
                gridGap={"10px"}
              >
                <Button kind="secondary" onClick={closeTabsPressed}>
                  Close all
                </Button>
                <Button kind="secondary">Create new groups</Button>
                <Button kind="secondary">Add all to exsiting group</Button>
                <Button kind="secondary" onClick={onOpenInNewWindowPress}>
                  Pull all tabs to new window
                </Button>
              </Block>
            )}
          </Block>
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
