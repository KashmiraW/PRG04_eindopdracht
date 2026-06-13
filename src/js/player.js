import { Actor, Vector, CollisionType, Keys } from "excalibur"
import { Resources } from "./resources.js"
import { Obstacle } from "./obstacle.js"
import { LifeUp } from "./lifeup.js"

export class Player extends Actor {
    constructor() {
        super({
            pos: new Vector(450, 530),
            width: 40,
            height: 40,
            scale: new Vector(3, 3)
        })

        this.graphics.use(Resources.Player.toSprite())

        this.canJump = false
        this.lives = 3
        this.isDucking = false
    }

    onInitialize() {

        this.game = this.scene.engine

        this.body.collisionType = CollisionType.Active

        this.on("collisionstart", (event) => {

            if (event.other.owner instanceof Obstacle) {

                const obstacle = event.other.owner

                console.log("BOTSING", obstacle.flying)

                if (obstacle.flying && this.isDucking) {
                    obstacle.kill()
                    return
                }

                this.lives--

                this.game.updateLives()

                console.log("Levens:", this.lives)

                obstacle.kill()

                if (this.lives <= 0) {

                    const highscore = localStorage.getItem("highscore") || 0

                    if (this.game.score > highscore) {
                        localStorage.setItem("highscore", this.game.score)
                    }

                    alert("GAME OVER")
                    window.location.reload()
                }
            }

            else if (event.other.owner instanceof LifeUp) {

                if (this.lives < 3) {
                    this.lives++
                    this.game.updateLives()
                }

                event.other.owner.kill()
            }

            else {
                this.canJump = true
            }
        })
    }

    onPreUpdate(engine) {

        if (
            engine.input.keyboard.wasPressed(Keys.Space) &&
            this.canJump
        ) {
            this.vel.y = -500
            this.canJump = false
        }

        if (engine.input.keyboard.isHeld(Keys.Down)) {
            this.isDucking = true
            this.scale.y = 1.5
        } else {
            this.isDucking = false
            this.scale.y = 3
        }
    }
}