// TODO: we have to change this to support chrome.tabs.tab type directly
export type TabIndexDocument = {
  content: string;
  tabId: string;
  tabUrl: string;
  tabTitle: string;
  tabFavIconUrl: string;
  tabGroup: number;
  openTime: number;
  closeTime: number;
  lastActionType: string;
  lastActionTime: number;
  tab: chrome.tabs.Tab;
};

//Sample documents
let documents: TabIndexDocument[] = [];

//function to add new documents to the index
export function AddDocument(document: TabIndexDocument) {
  if (document.tab.id) {
    RemoveDocumentById(document.tab.id);
    documents.push(document);
  }
}

export function Search(query: string): TabIndexDocument[] {
  const searchResponse = documents
    .filter(
      (doc) =>
        doc.tabUrl.includes(query) ||
        doc.tabUrl.includes(query) ||
        doc.content.includes(query)
    )
    .slice(0, 20);
  return searchResponse;
}

export function SearchById(tabId: number): TabIndexDocument | undefined {
  const searchResponse = documents.filter(
    (doc) => doc.tabId === tabId.toString()
  );
  if (searchResponse.length > 0) {
    return searchResponse[0];
  }
  return undefined;
}

//function to remove documents from the index
export function RemoveDocument(document: TabIndexDocument) {
  documents = documents.filter((doc) => doc.tabId === document.tabId);
}

//function to remove documents from the index
export function RemoveDocumentById(tabId: number) {
  documents = documents.filter((doc) => doc.tabId !== tabId.toString());
}
