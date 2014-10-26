(function () {

    var DOUBLE_PI = 2 * Math.PI;

    return new Polymer('cm-rotating-circles', {

    	centreX: 0,
        centreY: 0, 
                    
        publish: {
            totalCircles: 12,
            color: "rgba(64, 64, 64, .6)", 
            mainRad: 90,
            circleRad: 80,
            rotation: 0.1,               
        },

        created: function() {
            "use strict";

            this.centreX = this.width/2;
            this.centreY = this.height/2;

            this.counter = 0;
            this.anticounter = this.mainRad;

        },

        ready: function() {
            //Can't use strict here - polymer super() uses .caller() which throws an error in strct mode see 
            //http://stackoverflow.com/questions/16871050/inconsistent-scope-of-use-strict-on-different-web-browsers-concerning-argumen

            this.super();           
            this.backContext.lineWidth = 2 * this.pixelRatio;  
            this.backContext.fillStyle = this.color;
       },

        circleX: function circleX(distance, angle) {
            "use strict";

            var distance, angle;
            return distance * Math.sin(Math.PI * angle/6);
        },

        circleY: function circleY(distance, angle) {
            "use strict";

            var distance, angle;
            return -distance * Math.cos(Math.PI * angle/6);
        },

        positionCircles: function positionCircles(size) {
            "use strict";

            var cX, cY, i;
            for (i=1; i<this.totalCircles+1; i++) {
                cX = this.centreX + this.circleX(size, i + this.rotation);
                cY = this.centreY + this.circleY(size, i + this.rotation);
                this.backContext.beginPath();
                this.backContext.arc(cX, cY, this.circleRad, 0, DOUBLE_PI, false);
                this.backContext.fill();
                this.backContext.stroke();
            }
        },       

        animate: function animate() {
            "use strict";

            this.backContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if (this.counter < this.mainRad) { //expand
                this.positionCircles (this.counter);
                this.counter ++;
            }
            else if (this.anticounter > 0) { //contract
                this.positionCircles (this.anticounter);
                this.anticounter --;
            }
            else { //reset
                this.counter = 0;
                this.anticounter = this.mainRad;
                this.positionCircles (this.counter);
            }
            
            this.context.drawImage(this.backCanvas, 0, 0);  
            this.rotation += 0.1;
        },




    });
}());