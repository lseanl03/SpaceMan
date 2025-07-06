import SpaceManGameManager from "../Manager/SpaceMan.GameManager";
import SpaceManBetGroup from "./SpaceMan.BetGroup";
import SpaceManBetWaitingGroup from "./SpaceMan.BetWaitingGroup";
import SpaceManResult from "./SpaceMan.Result";
import SpaceManResultGroup from "./SpaceMan.ResultGroup";
import SpaceManViewBettingGroup from "./SpaceMan.ViewBettingGroup";

const {ccclass, property} = cc._decorator;

export enum SpaceManState{
    idle = "idle",
    idleToFly = "idle_to_pose_05",
    flyIdle = "pose_05_idle",
    flyToCrashed = "pose_05_to_pose_03",
    flyToCrashed2 = "pose_03_to_pose_04",
    flyToCrashed3 = "pose_04_to_idle",

}

export enum UFOState{
    ufoBlueLoop = "ufo_loop_blue_red",
    ufoOut = "ufo_out_red",
    ufoIn = "ufo_in",
}

export enum PlanetState{
    planet_01_in = "planet_01_in",
    planet_01_loop = "planet_01_loop",

}

export enum PlanetRayState{
    planet_01_loop = "planet_01_loop",
}

@ccclass
export default class SpaceManEntityGroup extends cc.Component {
    private parabola : sp.Skeleton = null;
    private uFO : sp.Skeleton = null;
    private planetRay : sp.Skeleton = null;
    private planet : sp.Skeleton = null;
    private spaceMan : sp.Skeleton = null;

    private spaceManState : SpaceManState = SpaceManState.idle;
    private ufoState : UFOState = UFOState.ufoBlueLoop;
    private planetRayState : PlanetRayState = PlanetRayState.planet_01_loop;
    private planetState : PlanetState = PlanetState.planet_01_in;

    public static Instance: SpaceManEntityGroup = null;

    protected onLoad(): void {
        SpaceManEntityGroup.Instance = this;

        [this.parabola, this.planetRay, this.planet, this.uFO, this.spaceMan] = this.getComponentsInChildren(sp.Skeleton);

        this.setUpSpaceManEvent();
        this.setUpPlanetEvent();
        this.setUpUFOEvent();
    }

    private setUpSpaceManEvent(){
        this.spaceMan.setCompleteListener(() => {
            if(this.spaceMan.animation === SpaceManState.idleToFly) this.handleOnFlyIdle();
            else if(this.spaceMan.animation === SpaceManState.flyToCrashed) this.handleOnCrashed2();
            else if(this.spaceMan.animation === SpaceManState.flyToCrashed2) this.handleOnCrashed3();
            else if(this.spaceMan.animation === SpaceManState.flyToCrashed3) this.handleOnIdle();
        });
    }

    private setUpPlanetEvent(){
        this.planet.setCompleteListener(() => {
            if(this.planet.animation === PlanetState.planet_01_in) this.handleOnPlanetStart();
        });
    }

    private setUpUFOEvent(){
        this.uFO.setCompleteListener(() => {
            if(this.uFO.animation === UFOState.ufoIn) this.handleOnUFOIn();
        });
    }
    

    protected start(): void {
        this.parabola.node.active = this.planetRay.node.active = this.planet.node.active = false;
        this.uFO.node.active = this.spaceMan.node.active = true;
    }

    private setAnim(nodeSkeleton: sp.Skeleton, anim : string, canLoop : boolean){
        nodeSkeleton.setAnimation(0, anim, canLoop);
    }

    public flyingStart(){
        if(this.spaceManState === SpaceManState.idle){
            this.planetRay.node.active = this.planet.node.active = true;
            SpaceManViewBettingGroup.Instance.setCostLabelState(true);
            SpaceManBetWaitingGroup.Instance.setBetWaitingState(false);


            this.setAnim(this.spaceMan, SpaceManState.idleToFly, false);
            this.spaceManState = SpaceManState.idleToFly;

            this.setAnim(this.uFO, UFOState.ufoOut, false);
            this.ufoState = UFOState.ufoOut;

            this.setAnim(this.planetRay, PlanetRayState.planet_01_loop, true);
            this.planetRayState = PlanetRayState.planet_01_loop;

            this.setAnim(this.planet, PlanetState.planet_01_in, false);
            this.planetState = PlanetState.planet_01_in;

            if(SpaceManGameManager.Instance.getIsBetting()){
                SpaceManBetGroup.Instance.setButtonActive(false);
            }
        }
    }

    private handleOnFlyIdle(){
        this.parabola.node.active = true;

        this.spaceMan.setAnimation(0, SpaceManState.flyIdle, true);
        this.spaceManState = SpaceManState.flyIdle;

        SpaceManGameManager.Instance.setIsWaitingRound(false);
        SpaceManGameManager.Instance.setIsEndRound(false);

        SpaceManResultGroup.Instance.getYellowResultScrollView().setLabel(`IN PLAY`);
        SpaceManResultGroup.Instance.getYellowResultList().setLabel(`IN PLAY`);
    }

    private handleOnPlanetStart(){
        this.planet.setAnimation(0, PlanetState.planet_01_loop, true);
        this.planetState = PlanetState.planet_01_loop;
    }

    public handleOnCrashed(){ //bị rơi
        this.parabola.node.active = this.planetRay.node.active = this.planet.node.active = false;

        this.spaceMan.setAnimation(0, SpaceManState.flyToCrashed, false);
        this.spaceManState = SpaceManState.flyToCrashed;

        SpaceManBetGroup.Instance.setButtonActive(true);
    }

    public handleOnCrashed2(){
        this.spaceMan.setAnimation(0, SpaceManState.flyToCrashed2, false);
        this.spaceManState = SpaceManState.flyToCrashed2;
    }

    public handleOnCrashed3(){
        this.spaceMan.setAnimation(0, SpaceManState.flyToCrashed3, false);
        this.spaceManState = SpaceManState.flyToCrashed3;

        this.setAnim(this.uFO, UFOState.ufoIn, false);
        this.ufoState = UFOState.ufoIn;
    }

    public handleOnIdle(){
        this.spaceMan.setAnimation(0, SpaceManState.idle, true);
        this.spaceManState = SpaceManState.idle;


        SpaceManBetWaitingGroup.Instance.setBetWaitingState(true);
        SpaceManViewBettingGroup.Instance.setCostLabelState(false);
        SpaceManViewBettingGroup.Instance.setStateLabelState(false);

    }


    //UFO
    public handleOnUFOIn(){
        this.setAnim(this.uFO, UFOState.ufoBlueLoop, true);
        this.ufoState = UFOState.ufoBlueLoop;
    }
}
