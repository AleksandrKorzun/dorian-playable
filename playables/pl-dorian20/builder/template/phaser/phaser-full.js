require('polyfills');

var CONST = require('const');
var Extend = require('utils/object/Extend');

var Phaser = {
    Cache: require('cache'),
    Cameras: {
        Scene2D: require('cameras/2d')
    },
    Events: require('events/index'),
    Game: require('core/Game'),
    GameObjects: {
        DisplayList: require('gameobjects/DisplayList'),
        GameObjectCreator: require('gameobjects/GameObjectCreator'),
        GameObjectFactory: require('gameobjects/GameObjectFactory'),
        UpdateList: require('gameobjects/UpdateList'),
        Components: require('gameobjects/components'),
        BuildGameObject: require('gameobjects/BuildGameObject'),
        BuildGameObjectAnimation: require('gameobjects/BuildGameObjectAnimation'),
        GameObject: require('gameobjects/GameObject'),
        Graphics: require('gameobjects/graphics/Graphics.js'),
        Image: require('gameobjects/image/Image'),
        Sprite: require('gameobjects/sprite/Sprite'),
        Text: require('gameobjects/text/Text'),
        Container: require('gameobjects/container/Container'),
        RenderTexture: require('gameobjects/rendertexture/RenderTexture.js'),
        TileSprite: require('gameobjects/tilesprite/TileSprite'),
        DOMElement: require('gameobjects/domelement/DOMElement'),
        Zone: require('gameobjects/zone/Zone'),
        Particles: {
            Particle: require('gameobjects/particles/Particle'),
            ParticleEmitter: require('gameobjects/particles/ParticleEmitter'),
            ParticleEmitterManager: require('gameobjects/particles/ParticleEmitterManager'),
            GravityWell: require('gameobjects/particles/GravityWell'),
        },
        Factories: {
            Graphics: require('gameobjects/graphics/GraphicsFactory'),
            RenderTexture: require('gameobjects/rendertexture/RenderTextureFactory.js'),
            Image: require('gameobjects/image/ImageFactory'),
            Sprite: require('gameobjects/sprite/SpriteFactory'),
            Text: require('gameobjects/text/TextFactory'),
            Container: require('gameobjects/container/ContainerFactory'),
            TileSprite: require('gameobjects/tilesprite/TileSpriteFactory'),
            ParticleEmitterManager: require('gameobjects/particles/ParticleManagerFactory'),
            DOMElement: require('gameobjects/domelement/DOMElementFactory'),
            Zone: require('gameobjects/zone/ZoneFactory'),
        },
        Creators: {
            Graphics: require('gameobjects/graphics/GraphicsCreator'),
            RenderTexture: require('gameobjects/rendertexture/RenderTextureCreator.js'),
            Image: require('gameobjects/image/ImageCreator'),
            Sprite: require('gameobjects/sprite/SpriteCreator'),
            Text: require('gameobjects/text/TextCreator'),
            Container: require('gameobjects/container/ContainerCreator'),
            TileSprite: require('gameobjects/tilesprite/TileSpriteCreator'),
            ParticleEmitterManager: require('gameobjects/particles/ParticleManagerCreator'),
            Zone: require('gameobjects/zone/ZoneCreator'),
        }
    },
    Input: require('input'),
    Loader: {
        Events: require('loader/events'),
        FileTypesManager: require('loader/FileTypesManager'),
        GetURL: require('loader/GetURL'),
        LoaderPlugin: require('loader/LoaderPlugin'),
        MultiFile: require('loader/MultiFile'),
    },
    Renderer: {
        Canvas: require('renderer/canvas'),
        WebGL: require('renderer/webgl'),
    },
    Scale: require('scale'),
    ScaleModes: require('renderer/ScaleModes'),
    Scene: require('scene/Scene'),
    Scenes: require('scene'),
    Time: require('time'),
    Tweens: require('tweens'),
    Display: require('display')
};

if (typeof FEATURE_SOUND)
{
    Phaser.Sound = require('sound');
}

Phaser = Extend(false, Phaser, CONST);

module.exports = Phaser;

global.Phaser = Phaser;