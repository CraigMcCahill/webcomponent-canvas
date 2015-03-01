'use strict';

(function () {

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ) {
                    window.setTimeout(callback, 1000 / 25);
                };
    })();

    return new Polymer('cm-animation', {

        canvas: null,
        context: null,
        backCanvas: null,
        backContext: null,
                      
        publish: {
            width: 400,
            height: 400,
            pixelRatio: 1,     
        },

        created: function() {},

        ready: function() {
            this.canvas = this.$.animationCanvas;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.context = this.canvas.getContext('2d');

            this.backCanvas = document.createElement('canvas');
            this.backContext = this.backCanvas.getContext('2d');
            this.backCanvas.width = this.width;
            this.backCanvas.height = this.height;

            this.start();
        },

        start: function start() {
            var that = this;
            (function animloop() {
                window.requestAnimFrame(animloop);
                that.animate();
            })();

        },

        stop: function stop() {
        },

        //override in subclasses
        animate: function animate() {
        },

    });
}());