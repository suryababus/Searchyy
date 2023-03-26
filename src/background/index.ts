// Shortcut key
chrome.commands.onCommand.addListener(async (command, tab) => {
  await chrome.tabs.update(tab.id || 0, { active: true });
  chrome.tabs.sendMessage(tab.id || 0, { type: "openSearchBar" });
});

function insertContentScript(tab: chrome.tabs.Tab) {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id || 0 },
      files: ["dist/content/index.js"],
    })
    .then(() => {
      console.log("INJECTED THE FOREGROUND SCRIPT.");
    })
    .catch((err) => console.log(err));
}

try {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(insertContentScript);
  });
} catch (e) {
  console.log(e);
}
