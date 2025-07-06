import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManLoadAssetBundle from "../SpaceMan.LoadAssetBundle";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManSession from "./SpaceMan.Session";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManSessionGroup extends cc.Component {
    private isShow: boolean = false;

    @property(cc.Node)
    private contentNode: cc.Node = null;

    @property(cc.Sprite)
    private popUpSession: cc.Sprite = null;

    private rollButton: cc.Button = null;

    public static Instance: SpaceManSessionGroup = null;

    protected onLoad(): void {
        SpaceManSessionGroup.Instance = this;

        this.popUpSession = this.node.getComponentInChildren(cc.Sprite);
        this.rollButton = this.node.getComponentInChildren(cc.Button);
        this.rollButton.node.on("click", this.onRollButtonClick, this);
    }

    private onRollButtonClick(){
        this.isShow = !this.isShow;
        SpaceManUtility.setButtonSprite(!this.isShow, this.rollButton, 'show-popup', 'hide-popup');
        this.RollEffect();
    }

    private RollEffect(){
        const heightNode = this.isShow ?  465 : 155;
        cc.tween(this.popUpSession.node)
        .to(0.2, {height: heightNode})
        .start();
    }

    public spawnSession(spriteName : string, cost : number, betAmount : number){
        SpaceManLoadAssetBundle.Instance.loadSprite(spriteName, spriteFrame => {
            SpaceManLoadAssetBundle.Instance.loadPrefab('Session', prefab => {
                prefab.parent = this.contentNode;
                prefab.setSiblingIndex(0);
                this.sessionEffect(prefab);
                
                const session = prefab.getComponent(SpaceManSession);
                session.setUserNameLabel(SpaceManGameManager.Instance.getUserName());
                session.setCostSprite(spriteFrame);
                cc.log(`${cost.toFixed(2)}x`);
                session.setCostLabel(`${cost.toFixed(2)}x`);
                session.setBetAmountLabel(betAmount);
                session.setWonAmountLabel(SpaceManGameManager.Instance.getWonAmount());
            });
        });
    }

    public handleEndRound(cost : number, betAmount : number){
        const costColor = SpaceManUtility.fomatSessionColor(cost);
        this.spawnSession(costColor, cost, betAmount);
    }

    private sessionEffect(node : cc.Node){
        node.scaleY = 0;
        cc.tween(node)
        .to(0.5, {scaleY: 1})
        .start();
    }
}
