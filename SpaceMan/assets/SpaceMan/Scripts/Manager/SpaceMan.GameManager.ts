import SpaceManBetGroup from "../Gameplay/SpaceMan.BetGroup";
import SpaceManBetWaitingGroup from "../Gameplay/SpaceMan.BetWaitingGroup";
import SpaceManCashOutGroup from "../Gameplay/SpaceMan.CashOutGroup";
import SpaceManEntityGroup from "../Gameplay/SpaceMan.EntityGroup";
import SpaceManResultGroup from "../Gameplay/SpaceMan.ResultGroup";
import SpaceManSessionGroup from "../Gameplay/SpaceMan.SessionGroup";
import SpaceManUserGroup from "../Gameplay/SpaceMan.UserGroup";
import SpaceManViewBettingGroup from "../Gameplay/SpaceMan.ViewBettingGroup";

const {ccclass, property} = cc._decorator;
const Random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass
export default class SpaceManGameManager extends cc.Component {
    private moneyAmount: number = 0;
    private betAmount: number = 0;
    private stopTime: number = 0;
    private delayTime: number = 0.1;
    private xCost: number = 1;
    private duration: number = 2;
    private userName: string = "";
    private canCashOutAmount: number = 0;
    private canCashOut50PercentAmount: number = 0;
    private autoCashAtCost: number = 0;
    private autoCash50PercentAtCost: number = 0;
    private wonAmount: number = 0;

    private totalRate: number = 0;
    private x1Rate: number = 50;
    private x2Rate: number = 50;
    private x10Rate: number = 0;
    private x100Rate: number = 0;

    private isAutoCash: boolean = false;
    private isAutoCash50Percent: boolean = false;
    private isBetting: boolean = false;
    private isWaitingRound: boolean = false;
    private isEndRound: boolean = false;

    public static Instance: SpaceManGameManager = null;

    protected onLoad(): void {
        SpaceManGameManager.Instance = this;

    }

    protected start(): void {
        this.setUserName("Tester");
        this.setMoneyAmount(1000000);
        this.setBetAmount(10000);

        this.setIsWaitingRound(true);
        this.setIsEndRound(true);

        this.randomStopTime();
    }

    protected update(dt: number): void {
        if(!this.isWaitingRound && !this.isEndRound){
            this.startRound(dt);
        }
        else if(this.isWaitingRound && this.isEndRound){
        }
    }

    public getWonAmount() {return this.wonAmount; }
    public setWonAmount(value: number){
        this.wonAmount = value;
    }

    public getAutoCashAtCost() {return this.autoCashAtCost; }
    public setAutoCashAtCost(value: number){
        this.autoCashAtCost = value;
    }

    public getAutoCash50PercentAtCost() {return this.autoCash50PercentAtCost; }
    public setAutoCash50PercentAtCost(value: number){
        this.autoCash50PercentAtCost = value;
    }

    public getCanCashOutAmount() {return this.canCashOutAmount; }
    public setCanCashOutAmount(value: number){
        this.canCashOutAmount = value;
    }

    public getCanCashOut50PercentAmount() {return this.canCashOut50PercentAmount; }
    public setCanCashOut50PercentAmount(value: number){
        this.canCashOut50PercentAmount = value;
    }

    public getUserName() {return this.userName; }
    public setUserName(value: string){
        this.userName = value;
        SpaceManUserGroup.Instance.setNickNameLabel(this.userName);
    }

    public getIsAutoCash() {return this.isAutoCash; }
    public setIsAutoCash(value: boolean){
        this.isAutoCash = value;
    }

    public getIsAutoCash50Percent() {return this.isAutoCash50Percent; }
    public setIsAutoCash50Percent(value: boolean){
        this.isAutoCash50Percent = value;
    }

    public getIsBetting() {return this.isBetting; }
    public setIsBetting(value: boolean){
        this.isBetting = value;
    }

    public getMoneyAmount() {return this.moneyAmount; }
    public setMoneyAmount(value: number){
        this.moneyAmount = value; 
        SpaceManUserGroup.Instance.setMoneyAmountLabel(this.moneyAmount);
    }

    public getBetAmount() {return this.betAmount; }
    public setBetAmount(value: number){
        if(this.isBetting) return;

        this.betAmount = Math.min(value, this.moneyAmount);
        SpaceManBetGroup.Instance.setBetAmountLabel(this.betAmount);
    }

    public getIsWaitingRound() {return this.isWaitingRound; }
    public setIsWaitingRound(value: boolean){
        this.isWaitingRound = value;
    }

    public getIsEndRound() {return this.isEndRound; }
    public setIsEndRound(value: boolean){
        this.isEndRound = value;
    }

    private setDuration(value: number){
        this.duration = parseFloat(value.toFixed(5)); 
    }

    public betMoney(value: number){
        this.setMoneyAmount(this.moneyAmount - value);
    }

    public startRound(dt : number){
        this.stopTime -= dt;
        if(this.stopTime > 0){
            this.delayTime -= dt;
            if(this.delayTime <= 0){
                this.delayTime = 0.1;
                this.xCost += dt/ this.duration; 
                this.xCost = parseFloat(this.xCost.toFixed(5));
                this.setDuration(2/this.xCost);
    
                SpaceManViewBettingGroup.Instance.setCostLabel(this.xCost);

                this.canCashOutAmount = this.betAmount * this.xCost;
                this.canCashOut50PercentAmount = this.canCashOutAmount / 2;


                const cashOutGroup = SpaceManBetGroup.Instance.getCashOutGroup();
                cashOutGroup.getCashOut().setCashOutAmountLabel(this.canCashOutAmount);
                cashOutGroup.getCashOut50Percent().setCashOutAmountLabel(this.canCashOut50PercentAmount);

                if(this.isBetting) this.checkToAutoCashOut();
            }
        }
        else{
            cc.log("End Round");
            this.handleEndRound();
        }
    }

    private handleEndRound(){
        this.setIsEndRound(true);
        this.setIsWaitingRound(true);

        SpaceManEntityGroup.Instance.handleOnCrashed();
        SpaceManResultGroup.Instance.handleEndRound(this.xCost);
        SpaceManSessionGroup.Instance.handleEndRound(this.xCost, this.betAmount);

        this.resetRound();
    }


    private randomStopTime() {

        let random = Math.random() * 100; //random tỉ lệ

        this.totalRate += this.x1Rate;
        
        if(random <= this.totalRate){ //nếu tỉ lệ random nhỏ hơn tỉ lệ x1
            this.stopTime = Random(1, 5);
        }
        else{
            this.totalRate += this.x2Rate;
            if(random <= this.totalRate){
                this.stopTime = Random(5, 20);
            }
            else{
                this.totalRate += this.x10Rate;
                if(random <= this.totalRate){
                    this.stopTime = Random(20, 100);
                }
                else{
                    this.totalRate += this.x100Rate;
                    if(random <= this.totalRate){
                        this.stopTime = Random(100, 1000);
                    }
                }
            }
        }
        this.stopTime = parseFloat(this.stopTime.toFixed(2));
        cc.log("Stop Time: " + this.stopTime);
    }

    private resetRound(){
        this.xCost = 1;
        this.totalRate = 0;
        this.randomStopTime();
        this.setDuration(2);
        this.setWonAmount(0);

        const cashOutGroup = SpaceManBetGroup.Instance.getCashOutGroup();
        cashOutGroup.getCashOut().setIsCashed(false);
        cashOutGroup.getCashOut50Percent().setIsCashed(false);
    }

    private checkToAutoCashOut(){
        if(this.isAutoCash && this.xCost >= this.autoCashAtCost){
            SpaceManBetGroup.Instance.getCashOutGroup().onCashOutButtonClick();
        }
        else if(this.isAutoCash50Percent && this.xCost >= this.autoCash50PercentAtCost){
            SpaceManBetGroup.Instance.getCashOutGroup().onCashOut50PercentButtonClick();
        }
    }

}
