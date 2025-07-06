import SpaceManUtility from "../SpaceMan.Utility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManUserGroup extends cc.Component {
    private bgSprite: cc.Sprite = null;
    private avatarSprite: cc.Sprite = null;
    private nickNameLabel: cc.Label = null;
    private moneyAmountLabel: cc.Label = null;

    public static Instance: SpaceManUserGroup = null;

    protected onLoad(): void {
        SpaceManUserGroup.Instance = this;

        this.bgSprite = this.node.getComponentInChildren(cc.Sprite);
        this.avatarSprite = this.bgSprite.getComponentInChildren(cc.Sprite);
        [this.nickNameLabel, this.moneyAmountLabel] = this.bgSprite.getComponentsInChildren(cc.Label);
    }

    public setMoneyAmountLabel(moneyAmount: number){
        this.moneyAmountLabel.string = SpaceManUtility.replaceMoney(moneyAmount);
    }

    public setNickNameLabel(nickName: string){
        this.nickNameLabel.string = nickName;
    }
}
