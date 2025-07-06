import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManUtility from "../SpaceMan.Utility";
import SpaceManConfig from "../SpaceManConfig";
import SpaceManAutoCashGroup from "./SpaceMan.AutoCashGroup";
import SpaceManCashOutGroup from "./SpaceMan.CashOutGroup";
import SpaceManChooseBet from "./SpaceMan.ChooseBet";
import SpaceManResultGroup from "./SpaceMan.ResultGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManBetGroup extends cc.Component {
    @property(cc.Node) 
    private buttonGroupTop: cc.Node = null;
    @property(cc.Node) 
    private buttonGroupBottom: cc.Node = null;
    @property(cc.Label)
    private betAmountLabel: cc.Label = null;
    @property(cc.Button)
    private minBetButton: cc.Button = null;
    @property(cc.Button)
    private maxBetButton: cc.Button = null;

    private statisticButton: cc.Button = null;
    private redoButton: cc.Button = null;
    private betButton: cc.Button = null;
    private x2Button: cc.Button = null;
    private autoPlayButton: cc.Button = null;
    private chooseBetList: SpaceManChooseBet[] = [];
    private cashOutGroup : SpaceManCashOutGroup = null;

    public static Instance: SpaceManBetGroup = null;
    
    protected onLoad(): void {
        SpaceManBetGroup.Instance = this;

        this.cashOutGroup = this.buttonGroupBottom.getComponentInChildren(SpaceManCashOutGroup);
        this.chooseBetList = this.buttonGroupTop.getComponentsInChildren(SpaceManChooseBet);
        [this.statisticButton, this.redoButton, this.betButton,this.x2Button, this.autoPlayButton]
        = this.buttonGroupBottom.getComponentsInChildren(cc.Button);

        this.statisticButton.node.on("click", this.onStatisticButtonClick, this);
        this.x2Button.node.on("click", this.onx2ButtonClick, this);
    }

    private onx2ButtonClick(){
        const gameManager = SpaceManGameManager.Instance;
        gameManager.setBetAmount(gameManager.getBetAmount() * 2);
    }

    protected start(): void {
        this.betButton.node.active = true;
        this.cashOutGroup.node.active = false;
    }

    public getCashOutGroup(){ return this.cashOutGroup; }

    private onStatisticButtonClick(){
        SpaceManResultGroup.Instance.resultGroupState(true);
    }

    private onBetButtonClick(){
        const gameManager = SpaceManGameManager.Instance;
        const state = gameManager.getIsBetting();        
        gameManager.setIsBetting(!state);
        gameManager.betMoney(state ? -gameManager.getBetAmount(): gameManager.getBetAmount());
        
        const autoCashGroup = SpaceManAutoCashGroup.Instance;
        autoCashGroup.handleOnBetButtonClick(!state);

        this.handleOnBetButtonClick(state);
        
    }


    private onMinBetButtonClick(){
        SpaceManGameManager.Instance.setBetAmount(SpaceManConfig.minBetAmount);
    }
    private onMaxBetButtonClick(){
        const maxBetAmount = SpaceManGameManager.Instance.getMoneyAmount();
        SpaceManGameManager.Instance.setBetAmount(maxBetAmount);
    }

    public setBetAmountLabel(betAmount: number){
        this.betAmountLabel.string = SpaceManUtility.formatMoney(betAmount);
    }


    private handleOnBetButtonClick(state : boolean){
        this.chooseBetListState(state);
        SpaceManUtility.setButtonState(state, this.minBetButton);
        SpaceManUtility.setButtonState(state, this.maxBetButton);

        SpaceManUtility.setButtonSprite(state, this.betButton, 'btn xacnhancuoc', 'btn dung cuoc');
        SpaceManUtility.setButtonSprite(state, this.minBetButton, 'btn down', 'btn down off');
        SpaceManUtility.setButtonSprite(state, this.maxBetButton, 'btn up', 'btn up off');
    }

    private chooseBetListState(state: boolean){
        this.chooseBetList.forEach(chooseBet => {
            SpaceManUtility.setButtonState(state, chooseBet.node.getComponent(cc.Button));
        });
    }

    public setButtonActive(betButtonActive : boolean){
        this.betButton.node.active = betButtonActive;
        this.cashOutGroup.node.active = !betButtonActive;

        if(betButtonActive){
            this.handleOnBetButtonClick(true);

            const gameManager = SpaceManGameManager.Instance;
            gameManager.setIsBetting(false);
            gameManager.setCanCashOutAmount(0);
            gameManager.setCanCashOut50PercentAmount(0);

            this.cashOutGroup.getCashOut().resetCashOut();
            this.cashOutGroup.getCashOut50Percent().resetCashOut();

            SpaceManAutoCashGroup.Instance.handleOnBetButtonClick(false);

        }
    }

}
