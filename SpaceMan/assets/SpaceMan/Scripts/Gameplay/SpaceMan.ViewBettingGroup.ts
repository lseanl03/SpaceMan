import SpaceManGameManager from "../Manager/SpaceMan.GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManViewBettingGroup extends cc.Component {
    private costLabel: cc.Label = null;
    private stateLabel: cc.Label = null;

    public static Instance: SpaceManViewBettingGroup = null;

    protected onLoad(): void {
        SpaceManViewBettingGroup.Instance = this;

        [this.costLabel, this.stateLabel] = this.getComponentsInChildren(cc.Label);
    }

    protected start(): void {
        this.setCostLabel(1);
        this.setStateLabelState(false);
        this.setCostLabelState(false);
    }

    public setCostLabel(cost: number){
        this.costLabel.string = `${cost.toFixed(2)}x`;
    }

    public setStateLabelState(state : boolean){
        this.stateLabel.node.active = state;
    }

    public setCostLabelState(state : boolean){
        this.costLabel.node.active = state;
        this.setCostLabel(1);

        if(state) SpaceManGameManager.Instance.setIsWaitingRound(false);
    }
}
