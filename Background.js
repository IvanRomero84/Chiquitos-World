class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.height = h

        this.image = new Image()
        this.image.src = "img/Background_Clouds.png"

        this.posX = 0
        this.posY = 0
        this.velY = 1

    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, this.posX, this.height + this.posY, this.width, this.height)
    }
    move() {
        this.posY -= this.velY
        if (this.posY <= -this.height) { this.posY = 0 }
    }

}