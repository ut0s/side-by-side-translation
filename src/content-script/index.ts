import './index.scss'
import $ from 'jquery';

if (import.meta.env.DEV) {
  console.log("side-by-side-translation inside content")
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.type === 'toggleSplit') {
    // check state
    isSplit() ? resetSplit() : split();


    // send split result
    chrome.runtime.sendMessage({
      type: 'setIconState',
      data: {
        tabId: message.data.tabId,
        isSplit: isSplit(),
      },
    });

    if (import.meta.env.DEV) {
      console.log("msg Type:\t", message.type)
      console.log("TabId:\t", message.data.tabId)
    }
  }
});

function split() {
  // wrap src document
  $("body").children().wrapAll("<div id='side_by_side_src' class='pane' translate='no'></div>")
  $("body").append("<div id='side_by_side_dst'  class='pane' translate='yes'></div>")

  // TODO rename id to unique
  $("#side_by_side_src").children().clone().appendTo("#side_by_side_dst")
  $("body").children().wrapAll("<div id='side_by_side_container' class=''></div>")
}

function resetSplit() {
  // unrwap container
  $("#side_by_side_src").unwrap()

  // remove dst pane
  $("#side_by_side_dst").remove()

  // unwrap src pane
  $("#side_by_side_src").children().unwrap()
}

function isSplit() {
  if (import.meta.env.DEV) {
    console.log("Lenght:\t", $("#side_by_side_container").length)
  }
  return $("#side_by_side_container").length === 1;
}

