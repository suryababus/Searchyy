// import Fuse from "fuse.js";

// // TODO: we have to change this to support chrome.tabs.tab type directly
// export type TabIndexDocument = {
//   content: string;
//   tabId: string;
//   tabUrl: string;
//   tabTitle: string;
//   tabFavIconUrl: string;
//   tabGroup: number;
//   openTime: number;
//   closeTime: number;
//   lastActionType: string;
//   lastActionTime: number;
//   tab: chrome.tabs.Tab;
// };

// const fuseIndexOptions = {
//   shouldSort: true,
//   isCaseSensitive: false,
//   threshold: 0.4,
//   includeScore: true,
//   location: 3,
//   includeMatches: true,
//   useExtendedSearch: true,
//   keys: [
//     "content",
//     "tabUrl",
//     "tabTitle",
//     "tabId", //This is the id of the tab in the browser
//   ],
// };

// //Sample documents
// const documents: TabIndexDocument[] = [];
// const tabsIndex = new Fuse(documents, fuseIndexOptions);

// //function to add new documents to the index
// export function AddDocument(document: TabIndexDocument) {
//   if (document.tab.id) {
//     RemoveDocumentById(document.tab.id);
//     tabsIndex.add(document);
//
//   }
// }

// export function Search(query: string): Fuse.FuseResult<TabIndexDocument>[] {
//   const searchResponse = tabsIndex.search(query);
//   return searchResponse;
// }

// export function SearchById(tabId: number): TabIndexDocument | undefined {
//   const searchResponse = tabsIndex.search({ tabId: tabId.toString() });
//   if (searchResponse.length > 0) {
//     return searchResponse[0].item;
//   }
//   return undefined;
// }

// //function to remove documents from the index
// export function RemoveDocument(document: TabIndexDocument) {
//   tabsIndex.remove((doc) => doc.tabId === document.tabId);
// }

// //function to remove documents from the index
// export function RemoveDocumentById(tabId: number) {
//   tabsIndex.remove((doc) => doc.tabId === tabId.toString());
// }
