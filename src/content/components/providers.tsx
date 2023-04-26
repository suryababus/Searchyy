/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, DarkTheme } from "baseui";

const iframeClassName = "my-iframe-body";
const engine = new Styletron({ prefix: `${iframeClassName}` });

const Providers: React.FC = ({ children }) => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>{children}</BaseProvider>
    </StyletronProvider>
  );
};

export default Providers;
