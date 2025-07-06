import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManLoadAssetBundle from "../SpaceMan.LoadAssetBundle";
import SpaceManUtility from "../SpaceMan.Utility";

export enum AutoCashType{
    none,
    autoCash,
    autoCash50Percent
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManAutoCash extends cc.Component {
    private autoCashButton: cc.Button = null;
    private subButton: cc.Button = null;
    private sumButton: cc.Button = null;
    private autoCashCostLabel: cc.Label = null;

    private editText : cc.EditBox = null;

    @property({type: cc.Enum(AutoCashType)})
    private autoCashType: AutoCashType = AutoCashType.autoCash;

    protected onLoad(): void {
        this.editText = this.getComponentInChildren(cc.EditBox);

        this.autoCashButton = this.node.getComponentInChildren(cc.Button);
        [this.subButton, this.sumButton] = this.editText.getComponentsInChildren(cc.Button);
    }

    private addText(){
        this.editText.maxLength = 5;
        const text = this.editText.string;
        this.editText.string = `${text}x`;
        if(this.autoCashType == AutoCashType.autoCash){
            SpaceManGameManager.Instance.setAutoCashAtCost(parseInt(text));
        }
        else if(this.autoCashType == AutoCashType.autoCash50Percent){
            SpaceManGameManager.Instance.setAutoCash50PercentAtCost(parseInt(text));
        }
        
    }

    private removeText(){
        this.editText.maxLength = 4;
        this.editText.string = "";
    }

    private onAutoCashButtonClick(){
        const gameManager = SpaceManGameManager.Instance;
        let state = false;
        if(this.autoCashType == AutoCashType.autoCash){
            state = gameManager.getIsAutoCash();
            gameManager.setIsAutoCash(!state);
        }
        else if(this.autoCashType == AutoCashType.autoCash50Percent){
            state = gameManager.getIsAutoCash50Percent();
            gameManager.setIsAutoCash50Percent(!state);
        }
        SpaceManUtility.setButtonSprite(!state, this.autoCashButton, 'autocash on', 'autocash off');
    }



}
