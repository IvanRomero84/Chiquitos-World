var audioElementJump = document.createElement('audio')
audioElementJump.setAttribute('src', 'mp3/grito.mp3')

class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "img/Cuñao.png"

        this.width = 80
        this.height = 80
        this.posX = 40

        this.posY0 = this.gameHeight * 0.98 - this.height
        this.posY = this.gameHeight * 0.98 - this.height
        this.gravity = 0.4
        this.velY = 1
        this.velX = 1

        this.keys = keys

        this.setListeners()
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.animate(framesCounter)

    }

    move() {
        this.posY += this.velY
        this.velY += this.gravity
        if (this.posY >= this.posY0) {
            this.velY = 1
            this.posY = this.posY0
        }

        if (this.keys.RIGHT_KEY.down && this.posX <= this.gameWidth) {
            this.posX += 15
            this.velX += 1
        }
        if (this.keys.TOP_KEY.down && this.posY >= this.posY) {
            this.posY -= 20
            this.velY += 1

        }
        if (this.keys.LEFT_KEY.down && this.posX >= -this.gameWidth) {
            this.posX -= 15
            this.velX -= 1
        }

    }

    animate(framesCounter) {
        if (framesCounter % 6 == 0) {
            this.image.framesIndex++              //Cambiamos el frame de la imagen cada 5 fps.
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
