class Enemy {
    constructor(src, ctx, canvasH, canvasW, posX, posY) {
        this.ctx = ctx;
        this.width = 80
        this.height = 80
        this.canvasW = canvasW
        this.velY = 1;
        this.posX = posX;
        this.posY = posY;
        this.image = new Image()
        this.image.src = src
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
    move() {
        this.posY += this.velY
    }


}