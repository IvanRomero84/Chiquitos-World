const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "40px sans-serif"
    },

    update: function (score) {
        this.ctx.fillStyle = "red";
        this.ctx.fillText(Math.floor(score), 50, 50);
        this.ctx.strokeText(Math.floor(score), 50, 50)
        this.ctx.strokeStyle = "black"

    }
};
