import SpaceManLoadAssetBundle from "./SpaceMan.LoadAssetBundle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManUtility extends cc.Component {

    public static formatMoney(value: number){
        let money = value;
        let type = "";
        if(money >= 1000000){
            money = (value / 1000000);
            type = "M";
        }
        else if(money >= 1000){
            money = (value / 1000);
            type = "K";
        }
        return money + type;
    }
    public static replaceMoney(value: number) {
        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    public static setButtonSprite(state : boolean, button: cc.Button, trueNameSprite: string, falseNameSprite: string){
        const nameSprite = state == true ? trueNameSprite : falseNameSprite;
        SpaceManLoadAssetBundle.Instance.loadSprite(nameSprite, sprite => button.node.getComponent(cc.Sprite).spriteFrame = sprite);
    }

    public static setButtonState(state : boolean, button: cc.Button){
        button.interactable = state;
        button.node.opacity = state ? 255 : 150;
    }

    public static formatColorText(text : string, color : cc.Color){
        return `<color=#${color.toHEX()}>${text}</color>`;
    }

    public static fomatButtonColor(value : number){
        let temp = value;
        if(temp >= 101) return 'btn pink';
        else if(temp >= 26) return 'btn purple';
        else if(temp >= 6) return 'btn blue';
        else if(temp >= 2) return 'btn dark blue';
        else if(temp >= 1.01) return 'btn blue';
        else return 'btn 1x';
    }

    public static fomatSessionColor(value : number){
        let temp = value;
        if(temp >= 101) return 'ls-pink';
        else if(temp >= 26) return 'ls-purple';
        else if(temp >= 6) return 'ls-blue';
        else if(temp >= 2) return 'ls-darkblue';
        else if(temp >= 1.01) return 'ls-blue';
        else return 'ls-1x';
    }
}
