import { Input } from "baseui/input";
import { Search } from "baseui/icon";

type Props = {
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  closeSearch: () => void;
  openSearch: () => void;
  searchKey: string;
};

export function SearchBar(props: Props) {
  const { setSearchKey, searchKey } = props;
  return (
    <Input
      value={searchKey}
      onChange={(e) => {
        setSearchKey(e.target.value);
      }}
      startEnhancer={() => <Search size={"20px"} />}
      autoFocus
      clearOnEscape
      overrides={{
        Root: {
          style: {
            Input: {
              backgroundColor: "rgb(41, 41, 41)",
            },
          },
        },
        Input: {
          style: {
            backgroundColor: "rgb(41, 41, 41)",
          },
        },
        InputContainer: {
          style: {
            backgroundColor: "rgb(41, 41, 41)",
          },
        },
      }}
      // onBlur={() => setTimeout(closeSearch, 100)}
      // onFocus={openSearch}
    />
  );
}
