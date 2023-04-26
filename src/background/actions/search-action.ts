import { SeachRequest } from "./action-request-types";
import { TabIndexDocument, Search } from "../repository/tabs-repo";

export function SearchTabs(request: SeachRequest): TabIndexDocument[] {
  let searchResponse = Search(request.query || " ");
  return searchResponse;
}
