/* global window */

import Network from "./Network";

export default class Affiliates extends Network {
  openStore() {
    const url = new URL(this.getUrl());

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    const finalUrl = url.toString();

    console.log("Final store URL:", finalUrl);

    window.mraid ? window.mraid.open(finalUrl) : window.top.open(finalUrl);
  }
}
