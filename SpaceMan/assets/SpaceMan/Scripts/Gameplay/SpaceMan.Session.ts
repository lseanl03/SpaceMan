import SpaceManUtility from "../SpaceMan.Utility";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManSession extends cc.Component {
    private userNameLabel: cc.Label = null;
    private betAmountLabel: cc.Label = null;
    private costSprite: cc.Sprite = null;
    private costLabel: cc.Label = null;
    private wonAmountLabel: cc.Label = null;

    protected onLoad(): void {
        [this.userNameLabel, this.betAmountLabel, this.costLabel, this.wonAmountLabel] = this.getComponentsInChildren(cc.Label);
        this.costSprite = this.getComponentInChildren(cc.Sprite);
    }

    public setUserNameLabel(userName: string){
        this.userNameLabel.string = userName;
    }

    public setBetAmountLabel(betAmount: number){
        this.betAmountLabel.string = SpaceManUtility.formatMoney(betAmount);
    }

    public setCostLabel(cost: string){
        this.costLabel.string = cost;
    }

    public setWonAmountLabel(wonAmount: number){
        this.wonAmountLabel.string = SpaceManUtility.formatMoney(Math.round(wonAmount));
    }

    public setCostSprite(spriteFrame: cc.SpriteFrame){
        this.costSprite.spriteFrame = spriteFrame;
    }
}
