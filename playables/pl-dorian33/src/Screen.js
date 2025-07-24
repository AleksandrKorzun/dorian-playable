export default class Screen {
    static get phoneProportions() {
        return window.innerWidth / window.innerHeight >= 1.8 || window.innerHeight / window.innerWidth >= 1.8;
    }

    static get iphoneSEProportions() {
        return (
            (window.innerWidth / window.innerHeight >= 1.6 && window.innerWidth / window.innerHeight < 1.8) ||
            (window.innerHeight / window.innerWidth >= 1.6 && window.innerHeight / window.innerWidth < 1.8)
        );
    }

    static get isPhone() {
        return Screen.phoneProportions && !Screen.iphoneSEProportions;
    }
}
