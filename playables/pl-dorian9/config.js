module.exports = {
  name: "",
  networks: [
    "Applovin",
    "Facebook",
    "Google",
    "IronSource",
    "Liftoff",
    "TikTok",
    "UnityAds",
    "Vungle",
    "Landing",
    "Mindworks",
  ],
  customPhaser: true,
  qualityAtlas: [0.8, 0.8],
  qualityTexture: [0.8, 0.8],
  bitrateAudio: 32, // 128, 64, 32, 16
  ios: "https://apps.apple.com/us/app/dorian-interactive-dramas-hub/id1529215455?ppid=79d64f0e-6623-43e2-a953-820939deb834 ",
  android:
    "https://play.google.com/store/apps/details?id=com.dorian.playtogether&listing=sharkbait",
  currentVersion: "scenario_24", // после изменения значения нужно заново запустить npm run dev
  versions: {
    scenario_19: {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
    scenario_24: {
      lang: "en",
      audio: [],
      fonts: [],
      sheets: [],
      spine: [],
      textures: [],
    },
  },
};
