class Bullet {
    constructor(ctx, x, y, y0, player.height) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.posY0 = posY0
        this.player.height = player.height
        this.radius = 5
        this.velX = 10
        this.velY = 1

        this.gravity = 0.25
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "red";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    move() {
        this.posX += this.velX
        this.posY += this.velY
        this.velY += this.gravity

        //if (this.posY >= this.playerHeight + this.posY0) {
        //    this.velY *= -1   //Si llegan al suelo invertimos su velocidad para que "reboten"
        //}
    }
}