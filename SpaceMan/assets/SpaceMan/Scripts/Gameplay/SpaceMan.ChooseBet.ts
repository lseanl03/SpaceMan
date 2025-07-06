import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManUtility from "../SpaceMan.Utility";

const {ccclass, property} = cc._decorator;

export enum BetLevelType {
    none,
    _10k = 10000,
    _20k = 20000,
    _50k = 50000,
    _100k = 100000,
}

@ccclass
export default class SpaceManChooseBet extends cc.Component {
    @property ({type: cc.Enum(BetLevelType)}) 
    private betLevelType: BetLevelType = BetLevelType._10k;

    private chooseBetButton: cc.Button = null;
    private chooseBetSprite: cc.Sprite = null;
    private sumSprite: cc.Sprite = null;
    private betLevelLabel: cc.Label = null;

    protected onLoad(): void {
        this.chooseBetButton = this.node.getComponent(cc.Button);
        this.chooseBetSprite = this.node.getComponent(cc.Sprite);
        this.sumSprite = this.node.getComponentInChildren(cc.Sprite);
        this.betLevelLabel = this.node.getComponentInChildren(cc.Label);

    }
    protected start(): void {
        this.setBetLevelLabel();
    }

    onChooseBetButtonClick(){
        const gameManager = SpaceManGameManager.Instance;
        const currentBet = gameManager.getBetAmount();
        gameManager.setBetAmount(currentBet + this.betLevelType);
    }

    private setBetLevelLabel(){
        this.betLevelLabel.string = SpaceManUtility.formatMoney(this.betLevelType);
    }
}
