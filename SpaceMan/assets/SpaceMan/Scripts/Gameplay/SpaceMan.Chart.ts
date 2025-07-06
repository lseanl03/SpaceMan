

const {ccclass, property} = cc._decorator;


@ccclass
export default class SpaceManChart extends cc.Component {
    @property
    private rate1: number = 0;
    @property
    private rate2: number = 0;

    private rateLabel: cc.Label = null;
    private percentLabel: cc.Label = null;
    private progressBar: cc.ProgressBar = null;

    protected onLoad(): void {
        [this.rateLabel, this.percentLabel] = this.node.getComponentsInChildren(cc.Label);
        this.progressBar = this.node.getComponentInChildren(cc.ProgressBar);
    }

    protected start(): void {
        this.setRateLabel();
    }

    public setPercentLabel(percent: number){
        this.percentLabel.string = `${percent.toFixed(2)}%`;
        this.progressBar.progress = percent / 100;
    }

    private setRateLabel(){
        if(this.rate2 != 0) this.rateLabel.string = `${this.rate1.toFixed(2)}x - ${this.rate2.toFixed(2)}x`;
        else this.rateLabel.string = `${this.rate1.toFixed(2)}x`;
    }
}
