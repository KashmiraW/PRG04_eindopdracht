import { Actor, Vector, Color, CollisionType } from "excalibur"
import { Resources } from "./resources.js"


export class LifeUp extends Actor {
    constructor() {
        super({
            pos: new Vector(1400, 550),
            width: 40,
            height: 40,
            scale: new Vector(0.2, 0.2)
        })
    }

    onInitialize() {

        this.graphics.use(Resources.LifeUp.toSprite())

        this.body.collisionType = CollisionType.Passive
    }

    onPreUpdate() {
        this.pos.x -= 5

        if (this.pos.x < -100) {
            this.kill()
        }
    }
}