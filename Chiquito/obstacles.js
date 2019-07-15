class Obstacle {
    constructor(ctx, canvasH, canvasW) {
        this.ctx = ctx;
        this.width = Math.floor(Math.random() * 50 + 100);
        this.height = 20;
        this.canvasW = canvasW
        this.velY = 1;
        this.posX = Math.floor(Math.random() * this.canvasW - 100);

        this.posY = 0 - this.height;

        this.image = new Image()
        this.image.src = "img/LandPiece_LightGreen.png"

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posY += this.velY
    }
}