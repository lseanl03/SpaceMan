
const {ccclass, property} = cc._decorator;

@ccclass
export default class SpaceManLoadAssetBundle extends cc.Component {
    private spaceManBundle: cc.AssetManager.Bundle = null;

    public static Instance : SpaceManLoadAssetBundle = null;

    protected onLoad(): void {
        SpaceManLoadAssetBundle.Instance = this;
        
    }
    protected start(): void {
        
        this.loadBundle('SpaceMan');
    }

    public getMinesBundle(){
        return this.spaceManBundle;
    }

    private loadBundle(bundleName: string) {
        cc.assetManager.loadBundle(bundleName, (err, bundle) => {
            if (err) {
                cc.error(`Failed to load bundle: ${bundleName}`, err);
                return;
            }

            this.spaceManBundle = bundle;

            cc.log(this.spaceManBundle);
        });

    }


    public loadPrefab(prefabName: string, callback: (prefab: cc.Node) => void) {
        this.spaceManBundle.load(`Prefabs/${prefabName}`, cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(`Failed to load prefab:`, err);
                return;
            }

            const popup = cc.instantiate(prefab);
            callback(popup);
        });
    }

    public loadSprite(url: string, callback: (spriteFrame: cc.SpriteFrame) => void){
        this.spaceManBundle.load(`Sprites/${url}`, cc.SpriteFrame, (error, spriteFrame: cc.SpriteFrame) => {
            if (error) {
                console.error('Load SpriteFrame failed:', error);
                return;
            }

            callback(spriteFrame);
        });
    }

}
