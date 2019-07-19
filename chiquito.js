
class Player {
    constructor(ctx, w, h, keys, obs) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "img/bob.png"
        this.firstObstacle = obs

        this.image.frames = 5
        this.image.framesIndex = 0

        this.width = 80
        this.height = 80
        this.posX = 40

        this.posY0 = this.firstObstacle.posY - this.height
        this.posY = this.posY0
        this.gravity = 0.4
        this.velY = 1
        this.velX = 1

        this.keys = keys
        this.canTop = true

        this.setListeners()
    }

    draw(framesCounter) {
        this.ctx.drawImage(this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.animate(framesCounter)
    }

    move() {
        if (this.keys.TOP_KEY.down && this.canTop) {
            this.posY -= 1;
            this.velY = - 10;
            this.canTop = false
            // this.velY -= 2
        }
        if (this.posY >= this.posY0) {
            this.velY = 1
            this.posY = this.posY0
            this.canTop = true
        }
        else {
            //console.log(this.posY, this.velY)
            this.posY += this.velY
            this.velY += this.gravity
        }

        if (this.keys.RIGHT_KEY.down && this.posX <= this.gameWidth) {
            this.posX += 10
            this.velX += 1
        }
        // if (this.keys.TOP_KEY.down && this.posY >= this.posY) {
        //     this.posY -= 20
        //     this.velY += 1
        // }
        if (this.keys.LEFT_KEY.down && this.posX >= -this.gameWidth) {
            this.posX -= 10
            this.velX -= 1
        }
    }

    animate(framesCounter) {
        if (framesCounter % 6 == 0) {
            this.image.framesIndex++
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0
            }
        }
    }
    setListeners() {
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY.key:
                    this.keys.TOP_KEY.down = true
                    // this.posY += 10
                    // this.velY -= 10
                    break;
                case this.keys.RIGHT_KEY.key:
                    this.keys.RIGHT_KEY.down = true

                    break;
                case this.keys.LEFT_KEY.key:
                    this.keys.LEFT_KEY.down = true

                    break;
            }
        }
        document.onkeyup = (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY.key:
                    this.keys.TOP_KEY.down = false

                    break;
                case this.keys.RIGHT_KEY.key:
                    this.keys.RIGHT_KEY.down = false

                    break;
                case this.keys.LEFT_KEY.key:
                    this.keys.LEFT_KEY.down = false

                    break;
            }
        }
    }


}
