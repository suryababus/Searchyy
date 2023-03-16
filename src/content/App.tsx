import React, { useEffect } from "react";
import "./App.css";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, DarkTheme, LightTheme } from "baseui";
import { Block } from "baseui/block";
import { Card } from "baseui/card";
import { ListItemLabel } from "baseui/list";

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
  }, [searchKey]);

  const goToTab = async (tabId: number) => {
    var updateProperties = { active: true };
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
