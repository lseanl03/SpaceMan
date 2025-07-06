
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManAutoCashGroup extends cc.Component {
    private autoCashNode : cc.Layout = null;
    private autoCash50PercentNode : cc.Layout = null;

    @property(cc.Node)
    private overlayNode : cc.Node = null;

    public static Instance: SpaceManAutoCashGroup = null;

    protected onLoad(): void {
        SpaceManAutoCashGroup.Instance = this;

        const bg = this.node.getComponentInChildren(cc.Sprite);
        [this.autoCashNode, this.autoCash50PercentNode] = bg.getComponentsInChildren(cc.Layout);
    }

    public handleOnBetButtonClick(state: boolean){
        this.overlayNode.active = state;
    }
}
