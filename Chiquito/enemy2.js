class EnemyTwo {
    constructor(src, ctx, canvasH, canvasW, posX, posY) {
        this.ctx = ctx;
        this.width = 150
        this.height = 150
        this.canvasW = canvasW
        this.velY = 3;
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
        this.posX -= 1
    }


}