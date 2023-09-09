async function toggleSideBySide(tab: chrome.tabs.Tab) {
  chrome.tabs.sendMessage(tab.id as number, {
    type: 'toggleSplit',
    data: {
      tabId: tab.id,
    },
  });

  if (import.meta.env.DEV) {
    console.log(tab.id);
  }
}

// icon clicked
chrome.action.onClicked.addListener(async (tab) => {
  toggleSideBySide(tab);
});

// tab updated
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//   toggleSideBySide(tab);
// });

// shortcut command
chrome.commands.onCommand.addListener((command, tab) => {
  switch (command) {
    case "toggle_side-by-side":
      toggleSideBySide(tab);
      break;
    default:
      break;
  }

  if (import.meta.env.DEV) {
    console.log(`Command: ${command}`);
  }
});

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.type === 'setIconState') {

    message.data.isSplit ? setIconON() : setIconOFF();

    if (import.meta.env.DEV) {
      console.log("msg Type:\t", message.type)
      console.log("TabId:\t", message.data.tabId)
      console.log("isSplit:\t", message.data.isSplit)
    }
  }
});

function setIconON() {
  // chrome.action.setBadgeText(
  //   { text: "ON" }
  // );
  // chrome.action.setBadgeBackgroundColor(
  //   { color: '#33FF33' },
  // );
  const turn_off_msg = chrome.i18n.getMessage("turn_off_msg");
  chrome.action.setTitle({
    title: turn_off_msg
  })

  chrome.action.setIcon({
    path: {
      // "16": "/icons/gray/icon16.png",
      // "32": "/icons/gray/icon32.png",
      "64": "src/assets/icon_ON_64.png",
      "128": "src/assets/icon_ON_128.png",
    }
  });
}

function setIconOFF() {
  // chrome.action.setBadgeText(
  //   { text: "OFF" }
  // );

  // chrome.action.setBadgeBackgroundColor(
  //   { color: '#FFFFDD' },
  // );
  const turn_on_msg = chrome.i18n.getMessage("turn_on_msg");
  chrome.action.setTitle({
    title: turn_on_msg
  })

  chrome.action.setIcon({
    path: {
      // "16": "/icons/gray/icon16.png",
      // "32": "/icons/gray/icon32.png",
      "64": "src/assets/icon_OFF_64.png",
      "128": "src/assets/icon_OFF_128.png",
    }
  });
}

