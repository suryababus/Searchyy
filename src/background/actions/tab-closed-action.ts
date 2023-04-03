
import { TabClosedRequest } from './action-request-types';
import { TabIndexDocument, AddDocument, SearchById, RemoveDocumentById } from '../repository/tabs-repo';

export function TabClosed(request: TabClosedRequest) {
    
    let tabId = request.tabData.id || -1;
    if(tabId === -1){
        return;
    }
    let indexDocument = indexDocumentFromTabClosedRequest(request);
    //If indexDocument is empty, then it means that the tab was not indexed
    if(!indexDocument.tabId){
        return;
    }
    
    RemoveDocumentById(tabId);
    AddDocument(indexDocument);
}

function indexDocumentFromTabClosedRequest(request: TabClosedRequest) : TabIndexDocument {
    
    let tabData = request.tabData
    let tabId = request.tabData.id || -1;
    if(tabId === -1){
        return {} as TabIndexDocument;
    }

    let tabIndexDocument = SearchById(tabId);
    if(!tabIndexDocument){
        return {} as TabIndexDocument;
    }

    //Current time epoch
    let currentTime = new Date().getTime()
    tabIndexDocument.closeTime = currentTime;
    tabIndexDocument.lastActionTime = currentTime;
    tabIndexDocument.lastActionType = request.action;

    return tabIndexDocument;
}

