// TODO: we have to change this to support chrome.tabs.tab type directly
// @ts-ignore type having some problem
import FlexSearch from "FlexSearch";

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

var documentIndexer = new FlexSearch.Document<TabIndexDocument, true>({
  document: {
    id: "id",
    index: ["tabTitle", "tabUrl", "content"],
    field: [],
    store: true,
  },
  tokenize: "full",
});

//function to add new documents to the index
export function AddDocument(document: TabIndexDocument) {
  if (document.tab.id) {
    RemoveDocumentById(document.tab.id);
    documentIndexer.addAsync(document.tab.id, document);
    documents.push(document);
  }
}

export function Search(query: string): TabIndexDocument[] {
  if (query.trim() === "") {
    const store = (documentIndexer as any).store;
    const allDocs: TabIndexDocument[] = [];
    Object.keys(store).forEach((key) => {
      allDocs.push(store[key]);
    });
    return allDocs;
  }

  let searchResponse: TabIndexDocument[] = [];
  let searchResult = documentIndexer.search(query, 200, {
    enrich: true,
  });
  console.log("documentIndexer", searchResult, documentIndexer);

  searchResult.forEach((r) => {
    r.result.forEach((res) => {
      searchResponse.push(res.doc);
    });
  });

  function onlyUnique(
    value: TabIndexDocument,
    index: number,
    array: TabIndexDocument[]
  ) {
    return array.indexOf(value) === index;
  }

  return searchResponse.filter(onlyUnique);
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
