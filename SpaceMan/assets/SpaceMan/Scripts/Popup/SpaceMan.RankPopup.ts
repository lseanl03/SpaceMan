import SpaceManPopupBase from "../Base/SpaceMan.PopupBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManRankPopup extends SpaceManPopupBase {

    public static Instance: SpaceManRankPopup = null;

    protected onLoad(): void {
        super.onLoad();
        SpaceManRankPopup.Instance = this;
    }

    
}
