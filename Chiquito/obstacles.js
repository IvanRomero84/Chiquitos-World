class Obstacle {
    constructor(src, ctx, canvasH, canvasW, posX, posY) {
        this.ctx = ctx;
        this.width = Math.floor(Math.random() * 50 + 100);
        this.height = 20;
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
    up() {
        this.velY = 3
    }
}
