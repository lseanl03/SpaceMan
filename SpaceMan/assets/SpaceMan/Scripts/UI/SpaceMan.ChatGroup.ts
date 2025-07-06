import SpaceManUIButtonBase from "../Base/SpaceMan.UIButtonBase";
import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManLoadAssetBundle from "../SpaceMan.LoadAssetBundle";
import SpaceManMenuGroup from "./SpaceMan.MenuGroup";
import SpaceManMessage from "./SpaceMan.Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManChatGroup extends SpaceManUIButtonBase {

    private editBox: cc.EditBox = null;
    private sendButton: cc.Button = null;

    @property(cc.Node)
    private content: cc.Node = null;

    public static Instance: SpaceManChatGroup = null;

    protected onLoad(): void {
        super.onLoad();
        
        SpaceManChatGroup.Instance = this;
        this.editBox = this.node.getComponentInChildren(cc.EditBox);
        this.sendButton = this.editBox.getComponentInChildren(cc.Button);

    }

    public override uIButtonState(state : boolean){
        super.uIButtonState(state);
        //SpaceManMenuGroup.Instance.uIButtonState(!state);
    }

    private setEditBoxLabel(value: string){
        this.editBox.string = value;
    }

    private onSendButton(){
        const message = this.editBox.string;
        if(message.length == 0) return;

        this.spawnMessage(message);
        this.setEditBoxLabel("");
    }

    private spawnMessage(text: string){
        const userName = SpaceManGameManager.Instance.getUserName();

        SpaceManLoadAssetBundle.Instance.loadPrefab("Message", (prefab) => {
            const message = prefab;
            message.parent = this.content;
            message.getComponent(SpaceManMessage).setMessageLabel(userName, text);
        });
    }
}
