import { getBucket } from "@extend-chrome/storage";
import './index.scss'
import $ from 'jquery';
import { State } from "../storage/state";
import { tabId } from "../storage/tabId";


if (import.meta.env.DEV) {
  console.log("side-by-side-translation inside content")
}

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.type === 'toggleSplit') {
    if (import.meta.env.DEV) {
      console.log("inside content:\t", message.data.isSplit);
    }

    // check state
    const state = getBucket<State>(String(message.data.tabId));
    const _state = await state.get();

    _state.isEnable ? split() : resetSplit();

    if (import.meta.env.DEV) {
      console.log("TabId:\t", message.data.tabId)
      console.log(_state.isEnable ? "ON" : "OFF")
    }

  }
});

function split() {
  if (!isSplit()) {
    // wrap src document
    // flex-fill
    $("body").children().wrapAll("<div id='side_by_side_src' class='pane' translate='no'></div>")
    $("body").append("<div id='side_by_side_dst'  class='pane' translate='yes'></div>")

    // TODO rename id to unique
    $("#side_by_side_src").children().clone().appendTo("#side_by_side_dst")
    // $("body").children().wrapAll("<div class='d-inline-flex'></div>")
    // $("body").children().wrapAll("<div id='side_by_side_container' class='d-flex flex-row'></div>")
    $("body").children().wrapAll("<div id='side_by_side_container' class=''></div>")
  }
}

function resetSplit() {
  if (isSplit()) {
    // unrwap container
    $("#side_by_side_src").unwrap()

    // remove dst pane
    $("#side_by_side_dst").remove()

    // unwrap src pane
    $("#side_by_side_src").children().unwrap()
  }
}

function isSplit() {
  if (import.meta.env.DEV) {
    console.log("Lenght:\t", $("#side_by_side_container").length)
  }
  return $("#side_by_side_container").length == 1;
}