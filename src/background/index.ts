import { getBucket } from "@extend-chrome/storage";
import { State } from "../storage/state";

async function toggleSideBySide(tab: chrome.tabs.Tab) {
  const state = getBucket<State>(String(tab.id));
  const _ = await state.get();

  if (_.tabId == tab.id) {
    const isEnable = _.isEnable
    if (typeof (isEnable) == "boolean") {
      if (isEnable) {
        state.set({
          isEnable: false
        });
        setIconOFF();
        chrome.tabs.sendMessage(tab.id as number, {
          type: 'toggleSplit',
          data: {
            isSplit: false,
            tabId: tab.id,
          },
        });
      } else {
        state.set({
          isEnable: true
        });
        setIconON();
        chrome.tabs.sendMessage(tab.id as number, {
          type: 'toggleSplit',
          data: {
            isSplit: true,
            tabId: tab.id,
          },
        });

      }
    }
  } else {
    // initialize
    console.log("typeof:", typeof (_.isEnable));
    state.set({
      tabId: tab.id,
      isEnable: true
    });
    setIconON();
  }

  if (import.meta.env.DEV) {
    console.log(tab.id);
    console.log(_.tabId);
  }
}

// icon clicked
chrome.action.onClicked.addListener(async (tab) => {
  toggleSideBySide(tab);
});

// tab updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  toggleSideBySide(tab);
});


chrome.tabs.onActivated.addListener(async (tabActiveInfo) => {
  const state = getBucket<State>(String(tabActiveInfo.tabId));
  const _ = await state.get();

  if (_.tabId != tabActiveInfo.tabId) {
    // initialize
    // default off
    state.set({
      tabId: tabActiveInfo.tabId,
      isEnable: false
    });
    setIconOFF();
  } else {
    const isEnable = _.isEnable
    isEnable ? setIconON() : setIconOFF();
    if (import.meta.env.DEV) {
      console.log("inside onActivated:\t", isEnable);
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
  chrome.action.setTitle({
    title: "Trun Off Side By Side."
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

  chrome.action.setTitle({
    title: "Trun On Side By Side."
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

chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`Command: ${command}`);

  switch (command) {
    case "toggle_side-by-side":
      toggleSideBySide(tab);
      break;
    default:
      break;
  }

});