import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme, useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Card } from "baseui/card";
import { Input } from "baseui/input";
import { useSpotSearch } from "./state/spot-search";
import { Badge, COLOR } from "baseui/badge";
import { LabelXSmall, ParagraphXSmall } from "baseui/typography";

const iframeClassName = "my-iframe-body";
const engine = new Styletron({ prefix: `${iframeClassName}` });

function App() {
  const {
    visible,
    setVisibility,
    highlightedSearchResult,
    setHighlightedSearchResult,
  } = useSpotSearch();

  const [searchKey, setSearchKey] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [, theme] = useStyletron();

  const closeSearch = useCallback(() => {
    setSearchResult([]);
    setVisibility(false);
    setHighlightedSearchResult(0);
  }, [setHighlightedSearchResult, setVisibility]);
  const openSearch = useCallback(() => {
    setSearchResult([]);
    setVisibility(true);
    setHighlightedSearchResult(0);
  }, [setHighlightedSearchResult, setVisibility]);

  const onTabCardClick = useCallback(
    (tab: any) => {
      goToTab(tab.meta.tabId);
      closeSearch();
    },
    [closeSearch]
  );

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeSearch();
      }
      if (e.key === "ArrowDown") {
        if (highlightedSearchResult === searchResult.length) {
          setHighlightedSearchResult(1);
          return;
        }
        setHighlightedSearchResult(highlightedSearchResult + 1);
      }
      if (e.key === "ArrowUp") {
        if (highlightedSearchResult === 0) {
          setHighlightedSearchResult(searchResult.length);
          return;
        }
        setHighlightedSearchResult(highlightedSearchResult - 1);
      }
      if (e.key === "Enter") {
        onTabCardClick(searchResult[highlightedSearchResult - 1]);
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [
    closeSearch,
    highlightedSearchResult,
    onTabCardClick,
    searchResult,
    setHighlightedSearchResult,
    setVisibility,
    visible,
  ]);

  useEffect(() => {
    setHighlightedSearchResult(0);
    if (searchKey === "") {
      setSearchResult([]);
      return;
    }
    const searchIndex = async () => {
      const response = await chrome.runtime.sendMessage({
        type: "search",
        key: searchKey.toLowerCase(),
      });

      setSearchResult(response || []);
    };
    searchIndex();
  }, [searchKey, setHighlightedSearchResult]);

  const goToTab = async (tabId: number) => {
    await chrome.runtime.sendMessage({
      type: "openTab",
      tabId,
    });
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
        <BaseProvider theme={LightTheme}>
          <Block
            width={"100vw"}
            height={"100vh"}
            maxWidth={"1000px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Block width="80%" height="80%" padding={"8px"}>
              <Input
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                autoFocus
                onBlur={() => setTimeout(closeSearch, 100)}
                onFocus={openSearch}
              />
              <Block padding={"4px"} />
              {searchResult.length > 0 &&
                searchResult.map((val, index) => (
                  <div key={index} onClick={() => onTabCardClick(val)}>
                    <Card
                      overrides={{
                        Root: {
                          style: ({ $theme }) => {
                            if (index !== highlightedSearchResult - 1)
                              return {};
                            return {
                              backgroundColor: $theme.colors.accent,
                            };
                          },
                        },
                      }}
                    >
                      {window.location.href === val?.meta.url && (
                        <Block marginBottom={"4px"}>
                          <Badge content="Same page" color={COLOR.positive} />
                        </Block>
                      )}

                      <LabelXSmall
                        margin={"0px"}
                        color={
                          index !== highlightedSearchResult - 1
                            ? theme.colors.accent
                            : theme.colors.white
                        }
                        $style={{
                          textDecoration: "underline",
                        }}
                      >
                        {val?.meta.url}
                      </LabelXSmall>
                      <ParagraphXSmall
                        marginTop={"4px"}
                        color={
                          index !== highlightedSearchResult - 1
                            ? theme.colors.black
                            : theme.colors.white
                        }
                      >
                        {val?.matchString}
                      </ParagraphXSmall>
                    </Card>
                    <Block padding={"4px"} />
                  </div>
                ))}
            </Block>
          </Block>
        </BaseProvider>
      </StyletronProvider>
    </div>
  );
}

export default App;
