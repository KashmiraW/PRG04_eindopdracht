import { Actor, Vector, CollisionType } from "excalibur"

export class Ground extends Actor {
    constructor() {
        super({
            pos: new Vector(640, 700),
            width: 1280,
            height: 40
        })
    }

    onInitialize() {
        this.body.collisionType = CollisionType.Fixed
    }
}