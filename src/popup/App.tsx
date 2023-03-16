import React, { useEffect } from "react";
import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Block } from "baseui/block";
import { Card } from "baseui/card";
import { ListItemLabel } from "baseui/list";
import { toaster } from "baseui/toast";

import { AppNavBar, NavItem, setItemActive } from "baseui/app-nav-bar";

import { ChevronDown, Delete, Upload } from "baseui/icon";
import { Input } from "baseui/input";
const engine = new Styletron();

function App() {
  const [mainItems, setMainItems] = React.useState<NavItem[]>([
    { icon: Upload, label: "Main A" },
    {
      active: true,
      icon: ChevronDown,
      label: "Main B",
      navExitIcon: Delete,
    },
  ]);

  const [searchKey, setSearchKey] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<any[]>([]);

  useEffect(() => {
    if (searchKey === "") {
      setSearchResult([]);
      return;
    }
    (async () => {
      const response = await chrome.runtime.sendMessage({
        type: "search",
        key: searchKey.toLowerCase(),
      });
      console.log(response);
      setSearchResult(response);
    })();
  }, [searchKey]);

  const goToTab = async (tabId: number) => {
    var updateProperties = { active: true };
    try {
      const tab = await chrome.tabs.get(tabId);
      await chrome.tabs.update(tabId, updateProperties);
      chrome.tabs.sendMessage(tabId, { type: "search", key: searchKey });
      await chrome.windows.update(tab.windowId, { focused: true });
    } catch (e) {
      if (e instanceof Error) {
        toaster.negative(e.message);
      }
    }
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Block width="500px" height="800px">
          <AppNavBar
            title="Searchyyy"
            mainItems={mainItems}
            onMainItemSelect={(item) => {
              setMainItems((prev) => setItemActive(prev, item));
            }}
          />
          <Block margin={"8px"}>
            <Input onChange={(e) => setSearchKey(e.target.value)} />
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
  );
}

export default App;
