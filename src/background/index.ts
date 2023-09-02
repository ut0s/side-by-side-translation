import { getBucket } from "@extend-chrome/storage";
import { State } from "../storage/state";
import { tabId } from "../storage/tabId";

chrome.action.onClicked.addListener(async (tab) => {
  const state = getBucket<State>(String(tab.id));
  const _ = await state.get();

  // set active tab id
  tabId.set({ tabId: tab.id })

  if (_.tabId == tab.id) {
    const isEnable = _.isEnable
    if (typeof (isEnable) == "boolean") {
      if (isEnable) {
        state.set({
          isEnable: false
        });
        setIconOFF();
      } else {
        state.set({
          isEnable: true
        });
        setIconON();
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

