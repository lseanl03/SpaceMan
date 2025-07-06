
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManPopupBase extends cc.Component {
    private overlay: cc.Sprite = null;
    private bg: cc.Sprite = null;
    private closeButton: cc.Button = null;

    protected onLoad(): void {
        [this.overlay, this.bg] = this.node.getComponentsInChildren(cc.Sprite);
        this.closeButton = this.node.getComponentInChildren(cc.Button);

        this.closeButton.node.on('click', this.onClickCloseButton, this);
    }

    private onClickCloseButton(){
        this.bgState(false);
    }

    public overlayState(state: boolean){
        this.overlay.node.active = state;
    }

    public bgState(state: boolean){
        if(state) {
            this.bg.node.active = state;
            this.overlayState(state);
        }

        this.bg.node.position = cc.v3(0, state ? 600 : 0, 0);
        const ease = state ? 'linear' : 'backIn';

        cc.tween(this.bg.node)
        .to(0.3, {position: cc.v3(0, state ? 0 : 600, 0)}, {easing: ease})
        .call(() => {
            this.bg.node.active = state;
            this.overlayState(state);
        })
        .start();
    }
}
