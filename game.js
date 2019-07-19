window.onload = function () {
    var audioElement = document.createElement('audio')
    audioElement.setAttribute('src', 'mp3/al_ataque.mp3')
    document.getElementById("start-button").onclick = function () {
        Game.init("canvas")
    };

    const Game = {
        canvas: undefined,
        ctx: undefined,
        width: undefined,
        height: undefined,
        obstacles: [],
        enemy: [],
        enemyTwo: [],
        framesCounter: 0,
        fps: 60,
        keys: {
            TOP_KEY: { key: 38, down: false },
            LEFT_KEY: { key: 37, down: false },
            RIGHT_KEY: { key: 39, down: false },
            A_KEY: 65
        },
        plataforma: undefined,
        score: undefined,
        item: [],
        aspirina: [],

        init: function () {
            this.canvas = document.getElementById("canvas")
            this.ctx = this.canvas.getContext("2d")
            this.width = window.innerWidth * 0.6
            this.height = window.innerHeight * 0.98
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.start()
            audioElement.play()
            document.getElementById("val").play()

        },
        start: function () {
            this.reset()
            this.interval = setInterval(() => {
                this.framesCounter++
                if (this.framesCounter > 1000) this.framesCounter = 0
                if (this.framesCounter % 100 == 0) this.score++
                this.clear()
                this.drawAll()
                this.moveAll()
                this.generateObstacles()
                this.gnerateEnemys()
                this.gnerateEnemysTwo()
                this.gnerateItems()
                this.gnerateAspirina()
                this.clearObstacles()
                this.clearEnemy()
                this.clearEnemyTwo()
                this.clearItem()
                this.clearAspirina()
                this.isCollision()
                this.isCollisionTwo()
                this.isCollisionThree()
                this.isCollisionFour()
                this.isCollisionFive()
                // this.levelUp()
                if (this.player.posY > this.canvas.height - 5) {
                    document.getElementById("grito").play()
                    document.getElementById("val").parentNode.removeChild(document.getElementById("val"))
                    this.gameOver()
                }


            }, 1000 / this.fps)

        },
        reset: function () {
            this.background = new Background(this.ctx, this.width, this.height)
            this.firstObs = new Obstacle("img/LandPiece_LightPing.png", this.ctx, this.canvas.width, this.gameHeight * 0.98 - this.height, 50, 550)
            this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys, this.firstObs)
            this.scoreboard = ScoreBoard
            this.scoreboard.init(this.ctx)
            this.score = 0
            this.obstacles = []
            this.enemy = []
            this.enemyTwo = []
            this.item = []
            this.aspirina = []
            this.obstacles.push(this.firstObs)
            this.obj = this.obstacles[0]
            this.supObsCero = setTimeout(() => {
                this.obstacles[0].posY = -100
            }, 15000)
        },
        drawAll: function () {
            this.background.draw()
            this.drawScore()
            this.enemy.forEach(enemy => enemy.draw())
            this.enemyTwo.forEach(enemyTwo => enemyTwo.draw())
            this.item.forEach(item => item.draw())
            this.aspirina.forEach(aspirina => aspirina.draw())
            this.obstacles[0].draw()
            for (let i = 1; i < this.obstacles.length; i++) {
                this.obstacles[i].draw()
            }
            this.player.draw(this.framesCounter)
        },

        moveAll: function () {
            this.enemy.forEach(enemy => enemy.move())
            this.enemyTwo.forEach(enemyTwo => enemyTwo.move())
            this.item.forEach(item => item.move())
            this.aspirina.forEach(aspirina => aspirina.move())
            for (let i = 1; i < this.obstacles.length; i++) {
                this.obstacles[i].move()
            }
            this.background.move()
            this.player.move()
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        //-----------------------------------------------------------------
        generateObstacles: function () {
            if (this.framesCounter % 140 == 0) {
                this.obstacles.push(new Obstacle("img/LandPiece_LightGreen.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height - 200))
            }
        },
        gnerateEnemys: function () {
            if (this.framesCounter % 300 == 0) {
                this.enemy.push(new Enemy("img/—Pngtree—extreme sport parachute athlete stimulate_3816413.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height - 200))
                document.getElementById("malo").play()
            }
        },
        gnerateEnemysTwo: function () {
            if (this.framesCounter % 400 == 0) {
                this.enemyTwo.push(new EnemyTwo("img/ninja1-200x227.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height - 200))
                document.getElementById("omg").play()
            }
        },
        gnerateItems: function () {
            if (this.framesCounter % 350 == 0) {
                this.item.push(new Item("img/kisspng-beer-icon-design-icon-beer-5a6a1851e1c1d3.5866716315169024819247.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height - 200))
                //document.getElementById("omg").play()
            }
        },
        gnerateAspirina: function () {
            if (this.framesCounter % 500 == 0) {
                this.aspirina.push(new Aspirina("img/59bf7f587a216d0b052f12d1.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height - 200))
                //document.getElementById("omg").play()
            }
        },
        //-----------------------------------------------------------------
        clearObstacles: function () {
            this.obstacles.forEach((obs, idx) => {
                if (obs.posY > this.canvas.height - 5) {
                    this.obstacles.splice(idx, 1)
                }
            })
        },
        clearEnemy: function () {
            this.enemy.forEach((enemy, idx) => {
                if (enemy.posY > this.canvas.height - 5) {
                    this.enemy.splice(idx, 1)
                }
            })
        },
        clearEnemyTwo: function () {
            this.enemyTwo.forEach((enemyTwo, idx) => {
                if (enemyTwo.posY > this.canvas.height - 5) {
                    this.enemyTwo.splice(idx, 1)
                }
            })
        },
        clearItem: function () {
            this.item.forEach((item, idx) => {
                if (item.posY > this.canvas.height - 5) {
                    this.item.splice(idx, 1)
                }
            })
        },
        clearAspirina: function () {
            this.aspirina.forEach((aspirina, idx) => {
                if (aspirina.posY > this.canvas.height - 5) {
                    this.aspirina.splice(idx, 1)
                }
            })
        },
        //-----------------------------------------------------------------
        isCollision: function () {
            let plataforma = this.obstacles.find(function (obs) {
                return this.player.posY + this.player.height >= obs.posY
                    && this.player.posX + this.player.width > obs.posX
                    && this.player.posX < obs.posX + obs.width
                    && this.player.posY < obs.posY + obs.height
                    && this.player.velY > 0
            }.bind(this))

            if (plataforma) {
                this.player.obj = plataforma

                this.player.posY0 = plataforma.posY - this.player.height

                this.player.posY = this.player.posY0
                // console.log(this.player.posY, this.player.posY0)
            } else {
                this.player.posY0 = this.canvas.height
            }

        },
        drawScore: function () {
            this.scoreboard.update(this.score)
        },
        isCollisionTwo: function () {
            this.enemy.forEach(enemy => {
                if ((this.player.posX + this.player.width) > (enemy.posX + 100)
                    && (this.player.posY + this.player.height) > (enemy.posY)
                    && this.player.posX < (enemy.posX + enemy.width - 100)
                    && this.player.posY < (enemy.posY + enemy.height - 100)) {
                    document.getElementById("hdp").play()
                    this.gameOver()
                }
            })

        },
        isCollisionThree: function () {
            this.item.forEach(item => {
                if ((this.player.posX + this.player.width) > (item.posX)
                    && (this.player.posY + this.player.height) > (item.posY)
                    && this.player.posX < (item.posX + item.width)
                    && this.player.posY < (item.posY + item.height)) {
                    this.keys.LEFT_KEY.key = 39
                    this.keys.RIGHT_KEY.key = 37
                    document.getElementById("camarero").play()
                    this.item.splice(0, 1)
                }
            })

        },
        isCollisionFour: function () {
            this.enemyTwo.forEach(enemyTwo => {
                if ((this.player.posX + this.player.width) > (enemyTwo.posX + 50)
                    && (this.player.posY + this.player.height) > (enemyTwo.posY)
                    && this.player.posX < (enemyTwo.posX + enemyTwo.width - 50)
                    && this.player.posY < (enemyTwo.posY + enemyTwo.height - 50)) {
                    document.getElementById("hdp").play()
                    this.gameOver()
                }
            })

        },
        isCollisionFive: function () {
            this.aspirina.forEach(aspirina => {
                if ((this.player.posX + this.player.width) > (aspirina.posX)
                    && (this.player.posY + this.player.height) > (aspirina.posY)
                    && this.player.posX < (aspirina.posX + aspirina.width)
                    && this.player.posY < (aspirina.posY + aspirina.height)) {
                    this.keys.LEFT_KEY.key = 37
                    this.keys.RIGHT_KEY.key = 39
                    document.getElementById("cuidadin").play()
                    this.aspirina.splice(0, 1)
                }
            })

        },
        gameOver: function () {
            this.ctx.fillText("Game Over", this.canvas.height / 2, this.canvas.width / 2)
            this.ctx.fillText(`Puntos: ${this.score}`, this.canvas.height / 2 + 20, 300)
            this.ctx.strokeText("Game Over", this.canvas.height / 2, this.canvas.width / 2)
            this.ctx.strokeText(`Puntos: ${this.score}`, this.canvas.height / 2 + 20, 300)
            this.ctx.strokeStyle = "black"
            this.ctx.fillStyle = "red"
            this.ctx.font = "90px impact"
            this.ctx.textAlign = "center"
            clearInterval(this.interval)
        },
    }
};












