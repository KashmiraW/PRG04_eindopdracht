import '../css/style.css'
import { Engine, Vector, DisplayMode, Label, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Cybercity } from './background.js'
import { Player } from './player.js'
import { Ground } from "./ground.js"
import { Obstacle } from "./obstacle.js"
import { LifeUp } from "./lifeup.js"




export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,

            physics: {
                gravity: new Vector(0, 800)
            }

        })
        this.start(ResourceLoader).then(() => this.startGame())

        this.score = 0
        this.gameSpeed = 5
    }

    startGame() {
        console.log("start de game!")


        const ground = new Ground()
        this.add(ground)

        const bgWidth = Resources.Cybercity.width * 0.9

        const bg1 = new Cybercity(bgWidth / 2)
        const bg2 = new Cybercity(bgWidth + bgWidth / 2)

        this.add(bg1)
        this.add(bg2)




        this.livesLabel = new Label({
            text: "❤️❤️❤️",
            pos: new Vector(20, 20),
            fontSize: 70
        })

        this.add(this.livesLabel)

        this.scoreLabel = new Label({
            text: "Score: 0",
            pos: new Vector(20, 45),
            fontSize: 80,
            color: "white"
        })

        this.add(this.scoreLabel)

        const highscore = localStorage.getItem("highscore") || 0

        this.highscoreLabel = new Label({
            text: "Highscore: " + highscore,
            pos: new Vector(20, 60),
            fontSize: 40,
            color: "white"
        })

        this.add(this.highscoreLabel)

        const player = new Player()
        this.add(player)

        this.player = player
        this.spawnObstacleRandom()


        const scoreTimer = new Timer({
            interval: 100,
            repeats: true,
            fcn: () => {
                if (this.isGameOver) return
                this.score += 10
                this.scoreLabel.text = "Score: " + this.score

                if (this.score % 500 === 0) {
                    this.gameSpeed += 1
                    console.log("Speed:", this.gameSpeed)
                }

            }
        })

        const lifeTimer = new Timer({
            interval: 10000,
            repeats: true,
            fcn: () => {
                this.spawnLifeUp()
            }
        })

        this.add(lifeTimer)
        lifeTimer.start()

        this.add(scoreTimer)
        scoreTimer.start()


    }

    updateLives() {
        if (this.player.lives === 3) {
            this.livesLabel.text = "❤️❤️❤️"
        }

        if (this.player.lives === 2) {
            this.livesLabel.text = "❤️❤️"
        }

        if (this.player.lives === 1) {
            this.livesLabel.text = "❤️"
        }

        if (this.player.lives <= 0) {
            this.livesLabel.text = ""
        }
    }

    spawnLifeUp() {
        const lifeup = new LifeUp()
        this.add(lifeup)
    }

    spawnObstacleRandom() {

        const obstacle = new Obstacle()
        this.add(obstacle)

        const nextTime = Math.floor(Math.random() * 2000) + 1000

        const timer = new Timer({
            interval: nextTime,
            repeats: false,
            fcn: () => {
                this.spawnObstacleRandom()
            }
        })

        this.add(timer)
        timer.start()
    }
}

new Game()