
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManUIButtonBase extends cc.Component {
    private isOpening: boolean = false;
    private bg: cc.Sprite = null;
    private button: cc.Button = null;

    @property(cc.Node)
    protected panel: cc.Node = null;

    protected onLoad(): void {
        this.bg = this.node.getComponentInChildren(cc.Sprite);
        this.button = this.node.getComponentInChildren(cc.Button);
    }
    

    protected onClickButton(){
        this.isOpening = !this.isOpening;
        this.uIButtonState(this.isOpening);
    }

    public uIButtonState(state : boolean){
        this.bg.node.active = state;
        this.panel.active = state;

        if(state) this.node.setSiblingIndex(1);
    }
}
