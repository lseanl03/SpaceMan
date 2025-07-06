import SpaceManUIButtonBase from "../Base/SpaceMan.UIButtonBase";
import SpaceManHistoryPopup from "../Popup/SpaceMan.HistoryPopup";
import SpaceManHowToPlayPopup from "../Popup/SpaceMan.HowToPlayPopup";
import SpaceManRankPopup from "../Popup/SpaceMan.RankPopup";
import SpaceManSettingPopup from "../Popup/SpaceMan.SettingPopup";
import SpaceManChatGroup from "./SpaceMan.ChatGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManMenuGroup extends SpaceManUIButtonBase {
    public static Instance: SpaceManMenuGroup = null;
    

    protected onLoad(): void {
        super.onLoad();
        SpaceManMenuGroup.Instance = this;

        const [historyButton, rankButton, howToPlayButton, settingButton, quitButton] = this.panel.getComponentsInChildren(cc.Button);
        historyButton.node.on("click", this.onHistoryButton, this);
        rankButton.node.on("click", this.onRankButton, this);
        howToPlayButton.node.on("click", this.onHowToPlayButton, this);
        settingButton.node.on("click", this.onSettingButton, this);
        quitButton.node.on("click", this.onQuitButton, this);
    }

    public override uIButtonState(state : boolean){
        super.uIButtonState(state);
    }

    private onHistoryButton(){
        this.onClickButton();
        SpaceManHistoryPopup.Instance.bgState(true);
    }

    private onRankButton(){
        this.onClickButton();
        SpaceManRankPopup.Instance.bgState(true);
    }

    private onHowToPlayButton(){
        this.onClickButton();
        SpaceManHowToPlayPopup.Instance.bgState(true);
    }

    private onSettingButton(){
        this.onClickButton();
        SpaceManSettingPopup.Instance.bgState(true);
    }

    private onQuitButton(){
        cc.game.end();
    }
}
