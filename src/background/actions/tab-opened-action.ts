
import { TabOpenedRequest } from './action-request-types';
import { TabIndexDocument, AddDocument } from '../repository/tabs-repo';

export function TabOpened(request: TabOpenedRequest) {
    //Call indexDocumentFromTabOpenedRequest to index the tab
    let indexDocument = indexDocumentFromTabOpenedRequest(request);
    AddDocument(indexDocument);
}

function indexDocumentFromTabOpenedRequest(request: TabOpenedRequest) : TabIndexDocument {
    let tabData = request.tabData
    //Current time epoch
    let currentTime = new Date().getTime()
    return {
        content: request.tabContent,
        tabId: (tabData.id || -1).toString(),
        tabUrl: tabData.url || '',
        tabTitle: tabData.title || '',
        tabFavIconUrl: tabData.favIconUrl || '',
        tabGroup: tabData.groupId || -1,
        openTime: currentTime,
        closeTime: -1,
        lastActionType: request.action,
        lastActionTime: currentTime,
    }
}

