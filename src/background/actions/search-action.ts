import { SeachRequest, SearchResponse } from './action-request-types';
import { TabIndexDocument, AddDocument, Search, RemoveDocumentById } from '../repository/tabs-repo';
import Fuse from 'fuse.js';

export function SearchTabs(request: SeachRequest): SearchResponse[] {
    let searchResponse = Search(request.query);
    let searchResponseArray: SearchResponse[] = [];
    for (let i = 0; i < searchResponse.length; i++) {
        searchResponseArray.push(searchResponseFromFuseDocument(searchResponse[i]));
    }
    return searchResponseArray;
}

function searchResponseFromFuseDocument(result: Fuse.FuseResult<TabIndexDocument>): SearchResponse {
    let document = result.item
    //Iterate result.matches and add the matched content to the matchedContent array
    let matchedContent: any[] = [];
    if (result.matches) {
        result.matches.forEach(element => {
            matchedContent.push({
                key: element.key,
                value: element.value,
                indices: element.indices
            })
        });
    }

    return {
        tabId: document.tabId,
        tabUrl: document.tabUrl,
        tabTitle: document.tabTitle,
        tabFavIconUrl: document.tabFavIconUrl,
        tabContent: document.content,
        matchedContent: matchedContent
    }
}

