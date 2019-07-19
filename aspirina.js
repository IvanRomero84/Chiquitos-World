class Aspirina {
    constructor(src, ctx, canvasH, canvasW, posX, posY) {
        this.ctx = ctx;
        this.width = 30
        this.height = 30
        this.canvasW = canvasW
        this.velY = 2;
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