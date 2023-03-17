import React, { useEffect } from "react";
import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { Block } from "baseui/block";
import { Card } from "baseui/card";
import { ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { useSpotSearch } from "./state/spot-search";

const iframeClassName = "my-iframe-body";
const engine = new Styletron({ prefix: `${iframeClassName}` });

function App() {
  const { visible, setVisibility } = useSpotSearch();

  const [searchKey, setSearchKey] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<any[]>([]);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.key === "e" && e.ctrlKey) {
        console.log("shortcut");
        setVisibility(!visible);
      }
      if (e.key === "Escape") {
        setVisibility(false);
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [setVisibility, visible]);

  useEffect(() => {
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
  }, [searchKey]);
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
              <Input onChange={(e) => setSearchKey(e.target.value)} autoFocus />
              <Block padding={"4px"} />
              {searchResult.length > 0 &&
                searchResult.map((val) => (
                  <div onClick={() => goToTab(val.meta.tabId)}>
                    <Card>
                      <ListItemLabel description={val?.matchString}>
                        {val?.meta.url}
                      </ListItemLabel>
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
