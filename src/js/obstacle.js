import { Actor, Vector, Color, CollisionType } from "excalibur"

export class Obstacle extends Actor {
    constructor() {
        const flying = Math.random() < 0.3

        super({
            pos: new Vector(
                1300,
                flying ? 530 : 640
            ),

            width: Math.floor(Math.random() * 50) + 30,
            height: Math.floor(Math.random() * 80) + 30,
            color: flying ? Color.Yellow : Color.Red
        })

        this.flying = flying

    }

    onInitialize() {
        this.body.collisionType = CollisionType.Active
        this.body.useGravity = false
    }

    onPreUpdate() {
        this.pos.x -= this.scene.engine.gameSpeed

        if (this.pos.x < -100) {
            this.kill()
        }
    }
}