import SpaceManChart from "./SpaceMan.Chart";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManChartTab extends cc.Component {
    private x1Chart: SpaceManChart = null;
    private x1To2Chart: SpaceManChart = null;
    private x2To6Chart: SpaceManChart = null;
    private x6To26Chart: SpaceManChart = null;
    private x26To101Chart: SpaceManChart = null;
    private x101To5000Chart: SpaceManChart = null;
    private x5000Chart: SpaceManChart = null;

    protected onLoad(): void {
        [
            this.x1Chart, this.x1To2Chart, this.x2To6Chart, this.x6To26Chart,
            this.x26To101Chart, this.x101To5000Chart, this.x5000Chart
        ] = this.node.getComponentsInChildren(SpaceManChart);
    }

    protected start(): void {
        this.test();
    }

    test(){
        this.x1Chart.setPercentLabel(23);
        this.x1To2Chart.setPercentLabel(23);
        this.x2To6Chart.setPercentLabel(24);
        this.x6To26Chart.setPercentLabel(20);
        this.x26To101Chart.setPercentLabel(8);
        this.x101To5000Chart.setPercentLabel(2);
        this.x5000Chart.setPercentLabel(0);
    }
}
