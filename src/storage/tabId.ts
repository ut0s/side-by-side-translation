import { getBucket } from "@extend-chrome/storage";

interface tabId {
  tabId: number;
}

const tabId = getBucket<tabId>("tabId");

export { tabId }
