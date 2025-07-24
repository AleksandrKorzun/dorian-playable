/* global window */

import Network from "./Network";

export default class Smadex extends Network {
  openStore() {
    if (
      window.smxTracking &&
      typeof window.smxTracking.redirect === "function"
    ) {
      window.smxTracking.redirect();
      this.triggerDownloadEvent();
    } else {
      window.top.open(this.getUrl());
    }
  }

  triggerLoadEvent() {
    if (window.smxTracking && typeof window.smxTracking.event === "function") {
      window.smxTracking.event("load");
    }
  }

  triggerDownloadEvent() {
    if (window.smxTracking && typeof window.smxTracking.event === "function") {
      window.smxTracking.event("download");
    }
  }

  triggerCompleteEvent() {
    if (window.smxTracking && typeof window.smxTracking.event === "function") {
      window.smxTracking.event("complete");
    }
  }
}
