import SpaceManPopupBase from "../Base/SpaceMan.PopupBase";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManHistoryPopup extends SpaceManPopupBase {
    
        public static Instance: SpaceManHistoryPopup = null;
    
        protected onLoad(): void {
            super.onLoad();
            SpaceManHistoryPopup.Instance = this;
        }
}
