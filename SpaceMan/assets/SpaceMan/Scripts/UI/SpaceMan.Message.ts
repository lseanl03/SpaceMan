import SpaceManUtility from "../SpaceMan.Utility";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManMessage extends cc.Component {
    private messageLabel: cc.RichText = null;

    protected onLoad(): void {
        this.messageLabel = this.node.getComponent(cc.RichText);
    }

    public setMessageLabel(userName: string, message: string){
        const userNameText = SpaceManUtility.formatColorText(userName, cc.Color.GREEN);
        this.messageLabel.string = `${userNameText}: ${message}`;
    }
}
