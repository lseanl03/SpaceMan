import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManCashOut from "./SpaceMan.CashOut";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManCashOutGroup extends cc.Component {
    private cashOut: SpaceManCashOut = null;
    private cashOut50Percent: SpaceManCashOut = null;

    protected onLoad(): void {
        [this.cashOut, this.cashOut50Percent] = this.node.getComponentsInChildren(SpaceManCashOut);

        this.cashOut.getButton().node.on("click", this.onCashOutButtonClick, this);
        this.cashOut50Percent.getButton().node.on("click", this.onCashOut50PercentButtonClick, this);
    }


    public onCashOutButtonClick(){
        cc.log("a");
        if(this.cashOut.getIsCashed()) return;
        this.cashOut.setIsCashed(true);
        
        const canWon = SpaceManGameManager.Instance.getCanCashOutAmount();
        this.handleOnCashOut(this.cashOut, canWon);
        SpaceManGameManager.Instance.setWonAmount(canWon);
    }

    public onCashOut50PercentButtonClick(){
        cc.log("b");
        if(this.cashOut50Percent.getIsCashed()) return;
        const canWon = SpaceManGameManager.Instance.getCanCashOut50PercentAmount();
        this.cashOut50Percent.setIsCashed(true);
        this.handleOnCashOut(this.cashOut50Percent, canWon);
        SpaceManGameManager.Instance.setWonAmount(canWon);
    }

    handleOnCashOut(cashOut : SpaceManCashOut, amount : number){
        cashOut.setIsCashed(true);
        cashOut.setCashOutLabel("Cashed");
        SpaceManUtility.setButtonState(false, cashOut.getButton());

        const gameManager = SpaceManGameManager.Instance;
        gameManager.setMoneyAmount(gameManager.getMoneyAmount() + amount);

    }
    

    public getCashOut(): SpaceManCashOut{ return this.cashOut; }

    public getCashOut50Percent(): SpaceManCashOut{ return this.cashOut50Percent; }
    
}
