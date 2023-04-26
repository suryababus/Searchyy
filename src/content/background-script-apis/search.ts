import { SearchResponseType } from "../../background/actions";

export const search = async (searchKey: string) => {
  return (await chrome.runtime.sendMessage({
    action: "SEARCH",
    query: searchKey.toLowerCase(),
  })) as SearchResponseType;
};
