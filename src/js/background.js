import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Cybercity extends Actor {
    constructor(x) {
        super({
            pos: new Vector(x, 360),
            scale: new Vector(0.9, 0.9)
        })

        this.graphics.use(Resources.Cybercity.toSprite())


        this.bgWidth = Resources.Cybercity.width * 0.9
        this.speed = 8
    }

    onPreUpdate() {
        this.pos.x -= this.scene.engine.gameSpeed * 0.4


        if (this.pos.x < -this.bgWidth / 2) {
            this.pos.x += this.bgWidth * 2
        }
    }
}