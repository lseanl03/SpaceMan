import SpaceManPopupBase from "../Base/SpaceMan.PopupBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManHowToPlayPopup extends SpaceManPopupBase {

    public static Instance: SpaceManHowToPlayPopup = null;

    protected onLoad(): void {
        super.onLoad();
        SpaceManHowToPlayPopup.Instance = this;
    }
    
}
