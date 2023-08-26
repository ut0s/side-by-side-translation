import { state } from "../storage/state";
import './index.scss'
import $ from 'jquery';

const _ = await state.get();
const isEnable = _.isEnable

if (isEnable) {
  if (!isSideBySide()) {
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
  console.log(isSideBySide())
} else {
  // TODO return nomal state
  if (isSideBySide()) {
    location.reload()
  }
  console.log(isSideBySide())
}

function isSideBySide() {
  return $("side_by_side_container").length == 1;
}