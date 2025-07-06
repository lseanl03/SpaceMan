import SpaceManLoadAssetBundle from "../SpaceMan.LoadAssetBundle";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManResult from "./SpaceMan.Result";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManResultGroup extends cc.Component {

    private isChartTab : boolean = true;
    private sessionCount : number = 0;
    
    @property(cc.Node)
    private bg: cc.Node = null;
    @property(cc.Node)
    private chartGroup: cc.Node = null;
    @property(cc.Node)
    private contentNode: cc.Node = null;
    @property(cc.Node)
    private resultListNode: cc.Node = null;
    @property(cc.Label)
    private titleLabel: cc.Label = null;
    @property(cc.Node)
    private resultTab : cc.Node = null;
    @property(cc.Node)
    private chartTab : cc.Node = null;
    @property(cc.Label)
    private totalSesionLabel : cc.Label = null;

    private thongKeSlider : cc.Slider = null;
    private fillSprite : cc.Sprite = null;

    private yellowResultScrollView : SpaceManResult = null;
    private yellowResultList : SpaceManResult = null;

    private backButon : cc.Button = null;
    private nextButton : cc.Button = null;
    private closeButton : cc.Button = null;

    public static Instance: SpaceManResultGroup = null;

    protected onLoad(): void {
        SpaceManResultGroup.Instance = this;

        this.yellowResultScrollView = this.contentNode.getComponentInChildren(SpaceManResult);
        this.yellowResultList = this.resultListNode.getComponentInChildren(SpaceManResult);
        this.thongKeSlider = this.chartGroup.getComponentInChildren(cc.Slider);
        this.fillSprite = this.thongKeSlider.getComponentInChildren(cc.Sprite);

        [this.backButon, this.nextButton, this.closeButton] = this.node.getComponentsInChildren(cc.Button);

        this.closeButton.node.on("click", this.onClickCloseButton, this);
        this.thongKeSlider.node.on("slide", this.setProgress, this);
    }

    protected start(): void {
        this.changeTab();
        this.resultGroupState(false);
        this.setProgress();
    }

    private setProgress(){
        this.fillSprite.fillRange = this.thongKeSlider.progress;
        
        //this.setTotalSesionLabel(`${this.thongKeSlider.progress * 100}`);
    }

    private onClickCloseButton(){
        this.resultGroupState(false);
    }

    private changeTab(){
        this.setTab();
        this.setTitleLabel(this.isChartTab ? "BIỂU ĐỒ" : "KẾT QUẢ");
    }

    private setTab(){
        this.isChartTab = !this.isChartTab;
        this.resultTab.active = !this.isChartTab;
        this.chartTab.active = this.isChartTab;
    }

    private setTotalSesionLabel(text: string) {this.totalSesionLabel.string = text; }

    private setTitleLabel(text: string) {this.titleLabel.string = text;  }

    public getYellowResultScrollView(){ return this.yellowResultScrollView; }
    public getYellowResultList(){ return this.yellowResultList; }

    private spawnResult(spriteName : string, cost : number){
        this.spawnResultBase(spriteName, cost, this.contentNode);
        this.spawnResultBase(spriteName, cost, this.resultListNode);

        this.sessionCount++;
        this.setTotalSesionLabel("" + this.sessionCount);
    }

    private spawnResultBase(spriteName : string, cost : number, parent : cc.Node){
        SpaceManLoadAssetBundle.Instance.loadSprite(spriteName, spriteFrame => {
            SpaceManLoadAssetBundle.Instance.loadPrefab('Result', prefab => {
                prefab.parent = parent;
                prefab.setSiblingIndex(1);
                this.resultEffect(prefab);
                
                const result = prefab.getComponent(SpaceManResult);
                result.setSprite(spriteFrame);
                result.setLabel(`${cost.toFixed(2)}x`);
            });
        });
    }

    public handleEndRound(cost : number){
        const costColor = SpaceManUtility.fomatButtonColor(cost);
        this.spawnResult(costColor, cost);
    }

    private resultEffect(node : cc.Node){
        node.scaleX = 0;
        cc.tween(node)
        .to(0.5, {scaleX: 1})
        .start();
    }

    public resultGroupState(state : boolean){
        this.bg.active = state;
        this.chartGroup.active = state;
    }
}
