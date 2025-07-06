
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManResult extends cc.Component {
    @property(cc.Sprite)
    private sprite: cc.Sprite = null;

    @property(cc.Label)
    private label: cc.Label = null;

    public setSprite(spriteFrame: cc.SpriteFrame){
        this.sprite.spriteFrame = spriteFrame;
    }

    public setLabel(text: string){
        this.label.string = text;
    }
}
