import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManConfig from "../SpaceManConfig";
import SpaceManEntityGroup from "./SpaceMan.EntityGroup";
import SpaceManResultGroup from "./SpaceMan.ResultGroup";
import SpaceManSessionGroup from "./SpaceMan.SessionGroup";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManBetWaitingGroup extends cc.Component {
    private canStartProgress : boolean = true;

    private timeCount: number = SpaceManConfig.waitingTime;

    private betWaitingLabel: cc.Label = null;
    private betWaitingTimeLabel: cc.Label = null;
    private bg : cc.Sprite = null;

    public static Instance: SpaceManBetWaitingGroup = null;
    
    protected onLoad(): void {
        SpaceManBetWaitingGroup.Instance = this;

        this.bg = this.node.getComponentInChildren(cc.Sprite);
        [this.betWaitingLabel, this.betWaitingTimeLabel] = this.bg.getComponentsInChildren(cc.Label);
    }

    protected update(dt: number): void {
        this.startWaitingRound(dt);
    }

    public setBetWaitingState(state: boolean){
        this.bg.node.active = state;

        if(state){
            this.canStartProgress = true;
            this.timeCount = SpaceManConfig.waitingTime;
        }
    }

    public setCanStartProgress(canStartProgress: boolean){
        this.canStartProgress = canStartProgress;
    }

    public setBetWaitingTimeLabel(time: number){
        this.betWaitingTimeLabel.string = time.toFixed(0);
    }
    public setTimeCount(time: number){
        this.timeCount = time;
    }

    private startWaitingRound(dt: number) {
        if(this.canStartProgress){

            this.timeCount -= dt;
            
            if(this.timeCount <= 0){
                this.timeCount = 0;
                this.canStartProgress = false;
                this.startProgress();
            }

            this.setBetWaitingTimeLabel(this.timeCount);
            SpaceManResultGroup.Instance.getYellowResultScrollView().setLabel(`${this.timeCount.toFixed(0)}s`);
            SpaceManResultGroup.Instance.getYellowResultList().setLabel(`${this.timeCount.toFixed(0)}s`);
        }
    }

    private startProgress(){
        SpaceManEntityGroup.Instance.flyingStart();
    }
}
