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


        init: function () {
            this.canvas = document.getElementById("canvas")
            this.ctx = this.canvas.getContext("2d")
            this.width = window.innerWidth * 0.6
            this.height = window.innerHeight * 0.98
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.start()
            audioElement.play()
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
                this.clearObstacles()
                this.isCollision()
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
            this.obstacles.push(this.firstObs)
            this.obj = this.obstacles[0]
        },
        drawAll: function () {
            this.background.draw()
            this.player.draw(this.framesCounter)
            this.drawScore()
            this.obstacles[0].draw()
            //this.obstacles.forEach(obs => obs.draw())
            for (let i = 1; i < this.obstacles.length; i++) {
                this.obstacles[i].draw()
            }
        },

        moveAll: function () {
            for (let i = 1; i < this.obstacles.length; i++) {
                this.obstacles[i].move()
            }
            this.background.move()
            this.player.move()
            //this.obstacles[i].forEach(obs => obs.move())
        },

        clear: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },

        generateObstacles: function () {
            if (this.framesCounter % 140 == 0) {
                // console.log(this.obstacles)
                this.obstacles.push(new Obstacle("img/LandPiece_LightGreen.png", this.ctx, this.canvas.width, this.player.posY0, Math.floor(Math.random() * this.width - 100), this.player.height)) //pusheamos nuevos obstaculos
            }
        },

        clearObstacles: function () {
            this.obstacles.forEach((obs, idx) => {
                if (obs.posX <= 0) {
                    this.obstacles.splice(idx, 1)
                }
            })
        },
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
            }
            else {
                this.player.posY0 = this.canvas.height
            }

        },
        drawScore: function () {
            this.scoreboard.update(this.score)
        },
        gameOver: function () {
            clearInterval(this.interval)
        }

    }

};









