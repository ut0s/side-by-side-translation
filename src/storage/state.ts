import { getBucket } from "@extend-chrome/storage";

interface State {
  isEnable: boolean;
}

const state = getBucket<State>("state");
export { state }