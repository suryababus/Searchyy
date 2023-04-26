/* eslint-disable no-restricted-globals */
import "./actions";

// Shortcut key
chrome.commands.onCommand.addListener(async (command, tab) => {
  if (tab.id && tab.id > 0) {
    await chrome.tabs.update(tab.id || 0, { active: true });
    chrome.tabs.sendMessage(tab.id || 0, { type: "OPEN_SEARCH_BAR" });
  }
});

function insertContentScript(tab: chrome.tabs.Tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id || 0 },
      files: ["dist/content/index.js"],
    })
    .then(() => {})
    .catch(console.log);
}

try {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(insertContentScript);
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {});
} catch (e) {}
