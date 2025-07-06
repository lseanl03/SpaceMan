import SpaceManPopupBase from "../Base/SpaceMan.PopupBase";
import SpaceManUtility from "../SpaceMan.Utility";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManSettingPopup extends SpaceManPopupBase {

    private isSoundOn: boolean = true;
    private isMusicOn: boolean = true;

    private soundButton: cc.Button = null;
    private musicButton: cc.Button = null;

    @property(cc.Node)
    private buttonGroup: cc.Node = null;

    public static Instance: SpaceManSettingPopup = null;

    protected onLoad(): void {
        super.onLoad();
        SpaceManSettingPopup.Instance = this;

        [this.soundButton, this.musicButton] = this.buttonGroup.getComponentsInChildren(cc.Button);
        this.soundButton.node.on("click", this.onSoundButton, this);
        this.musicButton.node.on("click", this.onMusicButton, this);
    }

    private onSoundButton(){
        this.isSoundOn = !this.isSoundOn;
        SpaceManUtility.setButtonSprite(this.isSoundOn, this.soundButton, "setting on", "setting off");
    }

    private onMusicButton(){
        this.isMusicOn = !this.isMusicOn;
        SpaceManUtility.setButtonSprite(this.isMusicOn, this.musicButton, "setting on", "setting off");
    }


}
