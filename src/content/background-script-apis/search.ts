export const search = async (searchKey: string) => {
  console.log("debuging", searchKey);
  return await chrome.runtime.sendMessage({
    action: "SEARCH",
    query: searchKey.toLowerCase(),
  });
};
