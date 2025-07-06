import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManBetGroup from "./SpaceMan.BetGroup";
import SpaceManCashOutGroup from "./SpaceMan.CashOutGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManCashOut extends cc.Component {

    private isCashed : boolean = false;
    private cashOutLabel: cc.Label = null;
    private cashOutAmountLabel: cc.Label = null;

    @property(cc.Button)
    private button: cc.Button = null;

    protected onLoad(): void {
        [this.cashOutLabel, this.cashOutAmountLabel] = this.node.getComponentsInChildren(cc.Label);
    }

    public getButton(){return this.button;}

    public resetCashOut(){
        this.isCashed = false;
        this.setCashOutLabel("Cash Out");
        this.setCashOutAmountLabel(0);
        SpaceManUtility.setButtonState(true, this.button);
    }

    public getIsCashed(){return this.isCashed;}

    public setIsCashed(isCashed: boolean){this.isCashed = isCashed;}

    public setCashOutAmountLabel(cashOutAmount: number){
        if(this.isCashed) return;
        this.cashOutAmountLabel.string = SpaceManUtility.formatMoney(Math.round(cashOutAmount));
    }

    public setCashOutLabel(cashOut: string){
        this.cashOutLabel.string = cashOut;
    }
}
