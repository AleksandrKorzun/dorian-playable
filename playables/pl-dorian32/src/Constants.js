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

export const ANIM_HAND_POSTIONS = [
  { px: -108, py: -138, lx: -650, ly: 0 },
  { px: 228, py: -138, lx: -200, ly: 0 },
  { px: -108, py: 258, lx: 200, ly: 0 },
  { px: 228, py: 258, lx: 650, ly: 0 },
];
export const ICONS = [];
export const USERS = [
  {
    NAME: "leather",
    px: -180,
    py: -230,
    lx: -690,
    ly: 0,
  },
  {
    NAME: "jay",
    px: 180,
    py: -230,
    lx: -230,
    ly: 0,
  },
  {
    NAME: "mike",
    px: -180,
    py: 230,
    lx: 230,
    ly: 0,
  },
  {
    NAME: "ghost",
    px: 180,
    py: 230,
    lx: 690,
    ly: 0,
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
