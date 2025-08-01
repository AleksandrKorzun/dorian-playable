/* global window */

import Utils from '../Utils';

export default class Orientation {
    static addDefaultProperties(obj) {
        obj.customProps = [];

        obj.addProperties = function set(props) {
            this.customProps = this.customProps.concat(props);

            (this.customProps.includes('pos') && this.px === undefined) && Orientation.addPosProperty(obj);
            (this.customProps.includes('scale') && this.pScaleX === undefined) && Orientation.addScaleProperty(obj);
            (this.customProps.includes('angle') && this.pAngle === undefined) && Orientation.addAngleProperty(obj);
            (this.customProps.includes('alpha') && this.pAlpha === undefined) && Orientation.addAlphaProperty(obj);
            (this.customProps.includes('visible') && this.pVisible === undefined) && Orientation.addVisibleProperty(obj);
            (this.customProps.includes('align') && this.pAlign === undefined) && Orientation.addAlignProperty(obj);
            (this.customProps.includes('depth') && this.pDepth === undefined) && Orientation.addDepthProperty(obj);
            (this.customProps.includes('image') && this.pImage === undefined) && Orientation.addImageProperty(obj);
            (this.customProps.includes('origin') && this.pOriginX === undefined) && Orientation.addOriginProperty(obj);
            (this.customProps.includes('maxScale') && this.lMaxScale === undefined) && Orientation.addMaxScaleProperty(obj);

            return this;
        };

        Utils.addProperty(obj, 'cx', function get() {
            return this._cx;
        }, function set(x) {
            this.x = Utils.getAlignX(this) + x; this._cx = x;
        });

        Utils.addProperty(obj, 'cy', function get() {
            return this._cy;
        }, function set(y) {
            this.y = Utils.getAlignY(this) + y;
            this._cy = y;
        });

        obj.setCustomPosition = Orientation.addPosFunc;
        obj.setCustomScale = Orientation.addScaleFunc;
        obj.setCustomAngle = Orientation.addAngleFunc;
        obj.setCustomAlpha = Orientation.addAlphaFunc;
        obj.setCustomVisible = Orientation.addVisibleFunc;
        obj.setCustomAlign = Orientation.addAlignFunc;
        obj.setCustomDepth = Orientation.addDepthFunc;
        obj.setCustomImage = Orientation.addImageFunc;
        obj.setCustomOrigin = Orientation.addOriginFunc;
        obj.setMaxScale = Orientation.addMaxScaleFunc;
    }

    static addPosProperty(obj) {
        Utils.addProperty(obj, 'px', function get() {
            return this._px;
        }, function set(x) {
            if (this.scene.game.size.isPortrait) this.x = Utils.getAlignX(this) + x; this._px = x;
        });

        Utils.addProperty(obj, 'py', function set() {
            return this._py;
        }, function set(y) {
            if (this.scene.game.size.isPortrait) this.y = Utils.getAlignY(this) + y; this._py = y;
        });

        Utils.addProperty(obj, 'lx', function get() {
            return this._lx;
        }, function set(x) {
            if (!this.scene.game.size.isPortrait) this.x = Utils.getAlignX(this) + x; this._lx = x;
        });

        Utils.addProperty(obj, 'ly', function get() {
            return this._ly;
        }, function set(y) {
            if (!this.scene.game.size.isPortrait) this.y = Utils.getAlignY(this) + y; this._ly = y;
        });

        Utils.changeProperty([this], ['px', 'py', 'lx', 'ly'], 0, '=');
    }

    static addScaleProperty(obj) {
        Utils.addProperty(obj, 'pScaleX', function get() {
            return this._pScaleX;
        }, function set(x) {
            if (this.scene.game.size.isPortrait) this.scaleX = x; this._pScaleX = x;
        });

        Utils.addProperty(obj, 'pScaleY', function get() {
            return this._pScaleY;
        }, function set(y) {
            if (this.scene.game.size.isPortrait) this.scaleY = y; this._pScaleY = y;
        });

        Utils.addProperty(obj, 'lScaleX', function get() {
            return this._lScaleX;
        }, function set(x) {
            if (!this.scene.game.size.isPortrait) this.scaleX = x; this._lScaleX = x;
        });

        Utils.addProperty(obj, 'lScaleY', function get() {
            return this._lScaleY;
        }, function set(y) {
            if (!this.scene.game.size.isPortrait) this.scaleY = y; this._lScaleY = y;
        });

        Utils.changeProperty([this], ['pScaleX', 'pScaleY', 'lScaleX', 'lScaleY'], 1, '=');
    }

    static addAngleProperty(obj) {
        Utils.addProperty(obj, 'pAngle', function get() {
            return this._pAngle;
        }, function set(angle) {
            if (this.scene.game.size.isPortrait) this.angle = angle;
            this._pAngle = angle;
        });

        Utils.addProperty(obj, 'lAngle', function get() {
            return this._lAngle;
        }, function set(angle) {
            if (!this.scene.game.size.isPortrait) this.angle = angle;
            this._lAngle = angle;
        });

        Utils.changeProperty([this], ['pAngle', 'lAngle'], 0, '=');
    }

    static addAlphaProperty(obj) {
        Utils.addProperty(obj, 'pAlpha', function get() {
            return this._pAlpha;
        }, function set(alpha) {
            if (this.scene.game.size.isPortrait) this.alpha = alpha;
            this._pAlpha = alpha;
        });

        Utils.addProperty(obj, 'lAlpha', function get() {
            return this._lAlpha;
        }, function set(alpha) {
            if (!this.scene.game.size.isPortrait) this.alpha = alpha;
            this._lAlpha = alpha;
        });

        Utils.changeProperty([this], ['pAlpha', 'lAlpha'], 1, '=');
    }

    static addVisibleProperty(obj) {
        Utils.addProperty(obj, 'pVisible', function get() {
            return this._pVisible;
        }, function set(visible) {
            if (this.scene.game.size.isPortrait) this.visible = visible;
            this._pVisible = visible;
        });

        Utils.addProperty(obj, 'lVisible', function get() {
            return this._lVisible;
        }, function set(visible) {
            if (!this.scene.game.size.isPortrait) this.visible = visible;
            this._lVisible = visible;
        });

        Utils.changeProperty([this], ['pVisible', 'lVisible'], true, '=');
    }

    static addAlignProperty(obj) {
        Utils.addProperty(obj, 'pAlign', function get() {
            return this._pAlign;
        }, function set(align) {
            if (this.scene.game.size.isPortrait) this.setCustomAlign(align);
            this._pAlign = align;
        });

        Utils.addProperty(obj, 'lAlign', function get() {
            return this._lAlign;
        }, function set(align) {
            if (!this.scene.game.size.isPortrait) this.setCustomAlign(align);
            this._lAlign = align;
        });

        Utils.changeProperty([this], ['pAlign', 'lAlign'], 'Center', '=');
    }

    static addDepthProperty(obj) {
        Utils.addProperty(obj, 'pDepth', function get() {
            return this._pDepth;
        }, function set(depth) {
            if (this.scene.game.size.isPortrait) this.setDepth(depth); this._pDepth = depth;
        });

        Utils.addProperty(obj, 'lDepth', function get() {
            return this._lDepth;
        }, function set(depth) {
            if (!this.scene.game.size.isPortrait) this.setDepth(depth); this._lDepth = depth;
        });

        Utils.changeProperty([this], ['pDepth', 'lDepth'], this.depth, '=');
        this.setDepth(this.depth);
    }

    static addImageProperty(obj) {
        Utils.addProperty(obj, 'pImage', function get() {
            return this._pImage;
        }, function set(img) {
            if (this.scene.game.size.isPortrait) {
                if (window.App.resources.textures[img] || img === '__MISSING' || img === 'None') {
                    this.setTexture(img);
                } else {
                    this.setTexture('atlas', img);
                }
            }

            this._pImage = img;
        });

        Utils.addProperty(obj, 'lImage', function get() {
            return this._lImage;
        }, function set(img) {
            if (!this.scene.game.size.isPortrait) {
                if (window.App.resources.textures[img] || img === '__MISSING' || img === 'None') {
                    this.setTexture(img);
                } else {
                    this.setTexture('atlas', img);
                }

                this._lImage = img;
            }
        });

        Utils.changeProperty([this], ['pImage', 'lImage'], '', '=');
    }

    static addOriginProperty(obj) {
        Utils.addProperty(obj, 'pOriginX', function get() {
            return this._pOriginX;
        }, function set(org) {
            this._pOriginX = org;
            if (this.scene.game.size.isPortrait) {
                this.setOrigin(this.pOriginX, this.pOriginY);
                this.originX = org;
            }
        });

        Utils.addProperty(obj, 'pOriginY', function get() {
            return this._pOriginY;
        }, function set(org) {
            this._pOriginY = org;
            if (this.scene.game.size.isPortrait) {
                this.setOrigin(this.pOriginX, this.pOriginY);
                this.originY = org;
            }
        });

        Utils.addProperty(obj, 'lOriginX', function get() {
            return this._lOriginX;
        }, function set(org) {
            this._lOriginX = org;
            if (!this.scene.game.size.isPortrait) {
                this.setOrigin(this.lOriginX, this.lOriginY);
                this.originX = org;
            }
        });
        Utils.addProperty(obj, 'lOriginY', function get() {
            return this._lOriginY;
        }, function set(org) {
            this._lOriginY = org;
            if (!this.scene.game.size.isPortrait) {
                this.setOrigin(this.lOriginX, this.lOriginY);
                this.originY = org;
            }
        });

        Utils.changeProperty([this], ['pOriginX', 'pOriginY', 'lOriginX', 'lOriginY'], 0.5, '=');
    }

    static addMaxScaleProperty(obj) {
        Utils.addProperty(obj, 'lMaxScale', function get() {
            return this._lMaxScale;
        }, function set(maxScale) {
            this._lMaxScale = maxScale;
            if (this.scene.game.size.isPortrait) this.setMaxScale(this.lMaxScale, this.pMaxScale);
        });

        Utils.addProperty(obj, 'pMaxScale', function get() {
            return this._pMaxScale;
        }, function set(maxScale) {
            this._pMaxScale = maxScale;
            if (!this.scene.game.size.isPortrait) this.setMaxScale(this.lMaxScale, this.pMaxScale);
        });

        Utils.changeProperty([this], ['lMaxScale', 'pMaxScale'], 1, '=');
    }

    static addPosFunc(lx = 0, ly = 0, px = 0, py = 0) {
        if (!this.customProps.includes('pos')) {
            this.x = Utils.getAlignX(this) + lx;
            this.y = Utils.getAlignY(this) + ly;

            this._cx = lx;
            this._cy = ly;
        } else {
            if (!this.scene.game.size.isPortrait) this.x = Utils.getAlignX(this) + lx;
            if (!this.scene.game.size.isPortrait) this.y = Utils.getAlignY(this) + ly;
            if (this.scene.game.size.isPortrait) this.x = Utils.getAlignX(this) + px;
            if (this.scene.game.size.isPortrait) this.y = Utils.getAlignY(this) + py;

            this._lx = lx;
            this._ly = ly;
            this._px = px;
            this._py = py;
        }

        return this;
    }

    static addScaleFunc(lScaleX = 1, lScaleY = 1, pScaleX = 1, pScaleY = 1) {
        if (!this.customProps.includes('scale')) {
            this.scaleX = lScaleX;
            this.scaleY = lScaleY;
        } else {
            if (!this.scene.game.size.isPortrait) this.scaleX = lScaleX;
            if (!this.scene.game.size.isPortrait) this.scaleY = lScaleY;
            if (this.scene.game.size.isPortrait) this.scaleX = pScaleX;
            if (this.scene.game.size.isPortrait) this.scaleY = pScaleY;

            this._lScaleX = lScaleX;
            this._lScaleY = lScaleY;
            this._pScaleX = pScaleX;
            this._pScaleY = pScaleY;
        }

        return this;
    }

    static addAngleFunc(lAngle = 0, pAngle = 0) {
        if (!this.customProps.includes('angle')) {
            this.angle = lAngle;
        } else {
            if (!this.scene.game.size.isPortrait) this.angle = lAngle;
            if (this.scene.game.size.isPortrait) this.angle = pAngle;

            this._lAngle = lAngle;
            this._pAngle = pAngle;
        }

        return this;
    }

    static addAlphaFunc(lAlpha = 0, pAlpha = 0) {
        if (!this.customProps.includes('alpha')) {
            this.alpha = lAlpha;
        } else {
            if (!this.scene.game.size.isPortrait) this.alpha = lAlpha;
            if (this.scene.game.size.isPortrait) this.alpha = pAlpha;

            this._lAlpha = lAlpha;
            this._pAlpha = pAlpha;
        }

        return this;
    }

    static addVisibleFunc(lVisible = 0, pVisible = 0) {
        if (!this.customProps.includes('visible')) {
            this.visible = lVisible;
        } else {
            if (!this.scene.game.size.isPortrait) this.visible = lVisible;
            if (this.scene.game.size.isPortrait) this.visible = pVisible;

            this._lVisible = lVisible;
            this._pVisible = pVisible;
        }

        return this;
    }

    static addAlignFunc(lAlign = 'Center', pAlign = 'Center') {
        if (!this.customProps.includes('align')) {
            this.align = lAlign;
        } else {
            if (!this.scene.game.size.isPortrait) this.align = lAlign;
            if (this.scene.game.size.isPortrait) this.align = pAlign;

            this._lAlign = lAlign;
            this._pAlign = pAlign;
        }

        if (this.customProps.includes('pos')) {
            this.setCustomPosition(this.lx, this.ly, this.px, this.py);
        } else {
            this.setCustomPosition(this.cx, this.cy);
        }

        return this;
    }

    static addDepthFunc(lDepth = 0, pDepth = 0) {
        if (!this.customProps.includes('depth')) {
            this.depth = lDepth;
        } else {
            if (!this.scene.game.size.isPortrait) this.setDepth(lDepth);
            if (this.scene.game.size.isPortrait) this.setDepth(pDepth);

            this._lDepth = lDepth;
            this._pDepth = pDepth;
        }

        return this;
    }

    static addImageFunc(lImage = '', pImage = '') {
        let typeL = 'sheets';
        let typeP = 'sheets';

        if (window.App.resources.textures[lImage] || lImage === '__MISSING' || lImage === 'None') typeL = 'texture';
        if (window.App.resources.textures[pImage] || pImage === '__MISSING' || pImage === 'None') typeP = 'texture';

        if (!this.customProps.includes('image')) {
            typeL === 'texture' ? this.setTexture(lImage) : this.setTexture('atlas', lImage);
        } else {
            if (!this.scene.game.size.isPortrait) {
                typeL === 'texture' ? this.setTexture(lImage) : this.setTexture('atlas', lImage);
            }

            if (this.scene.game.size.isPortrait) {
                typeP === 'texture' ? this.setTexture(pImage) : this.setTexture('atlas', pImage);
            }

            this._lImage = lImage;
            this._pImage = pImage;
        }

        return this;
    }

    static addOriginFunc(lOriginX = 0.5, lOriginY = 0.5, pOriginX = 0.5, pOriginY = 0.5) {
        if (!this.customProps.includes('origin')) {
            this.setOrigin(lOriginX, lOriginY);
        } else {
            if (!this.scene.game.size.isPortrait) this.setOrigin(lOriginX, lOriginY);
            if (this.scene.game.size.isPortrait) this.setOrigin(pOriginX, pOriginY);

            this._lOriginX = lOriginX;
            this._lOriginY = lOriginY;
            this._pOriginX = pOriginX;
            this._pOriginY = pOriginY;
        }

        return this;
    }

    static addMaxScaleFunc(lMaxScale, pMaxScale) {
        this.setScale(1);

        const height = this.scene.game.size.bottom - this.scene.game.size.top;
        const coff = Utils.coefficient(height, this.displayHeight, 1);

        if (!this.scene.game.size.isPortrait) this.setScale(coff * lMaxScale);
        if (this.scene.game.size.isPortrait) this.setScale(coff * pMaxScale);

        this._lMaxScale = lMaxScale;
        this._pMaxScale = pMaxScale;

        return this;
    }
}
