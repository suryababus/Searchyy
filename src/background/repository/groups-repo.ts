import Fuse from 'fuse.js';

export type GroupIndexDocument = {
    groupName: string;
    tabs: chrome.tabs.Tab[];
};

const fuseIndexOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        'groupName'
    ]
};

//Sample documents
const documents: GroupIndexDocument[] = []
const groupsIndex = new Fuse(documents, fuseIndexOptions);

//function to add new documents to the index
export function AddDocument(document: GroupIndexDocument){
    groupsIndex.add(document);
}

export function Search(query: string): Fuse.FuseResult<GroupIndexDocument>[] {
    const searchResponse = groupsIndex.search(query);
    return searchResponse;
}


//function to remove documents from the index
export function RemoveDocument(document: GroupIndexDocument){
    groupsIndex.remove((doc) => doc.groupName === document.groupName);
}

//function to remove documents from the index
export function RemoveDocumentById(groupName: string){
    groupsIndex.remove((doc) => doc.groupName === groupName);
}




