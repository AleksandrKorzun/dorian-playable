import Screen from "./Screen";

export const LAYERS = {
  CTA: 100,
  USER: 5,
  TITLE: 16,
  FILTER: 10,
  HEART: 12,
  LOGO: 200,
  BUTTON: 15,
  ICON: 16,
  PROGRESSBAR: 25,
  CHAT: 22,
};
export const appVersion = window.App.version;
export const ICONS = [];
export const USERS = [
  {
    NUMBER: "First",
    NAME: "Corey Moore",
    PHOTO: "leather",
    ICON: "user_icon_first",
    ICON_SMALL: "user_icon_small_first",
  },
  {
    NUMBER: "Second",
    NAME: "Stefan King",
    PHOTO: "jay",
    ICON: "user_icon_second",
    ICON_SMALL: "user_icon_small_second",
  },
  {
    NUMBER: "Third",
    NAME: "Mike Foster",
    PHOTO: "mike",
    ICON: "user_icon_third",
    ICON_SMALL: "user_icon_small_third",
  },
  {
    NUMBER: "Fourth",
    NAME: "Jason Candle",
    PHOTO: "ghost",
    ICON: "user_icon_fourth",
    ICON_SMALL: "user_icon_small_fourth",
  },
];

const POSITIONS_PHONE = {
  CHAT: Screen.iphoneSEProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
  CARD: Screen.iphoneSEProportions ? [0, 110, 0, 100] : [0, 110, 0, 100],
};

export const POSITIONS = {
  CHAT:
    Screen.phoneProportions || Screen.iphoneSEProportions
      ? POSITIONS_PHONE.CHAT
      : [0, 0, 0, 0],
  CARD:
    Screen.phoneProportions || Screen.iphoneSEProportions
      ? POSITIONS_PHONE.CARD
      : [0, 140, 0, 140],
};

const SCALES_PHONE = {
  CHAT: Screen.iphoneSEProportions ? [0.8, 0.8, 1, 1] : [0.8, 0.8, 1, 1],
  CARD: Screen.iphoneSEProportions
    ? [0.75, 0.75, 0.8, 0.8]
    : [0.75, 0.75, 0.8, 0.8],
};
export const SCALES = {
  CHAT:
    Screen.phoneProportions || Screen.iphoneSEProportions
      ? SCALES_PHONE.CHAT
      : [0.8, 0.8, 0.8, 0.8],
  CARD:
    Screen.phoneProportions || Screen.iphoneSEProportions
      ? SCALES_PHONE.CARD
      : [0.75, 0.75, 0.7, 0.7],
};
