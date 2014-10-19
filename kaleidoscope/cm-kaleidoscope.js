(function () {

    function degreesToRadians(degrees) {
        return degrees * (Math.PI /180);
    }

    return new Polymer('cm-kaleidoscope', {

    	centreX: 0,
        centreY: 0, 
        radiusX: 0,
        radiusY: 0,
                      
        publish: {
            totalQuads: 16,
            color: "rgba(64, 64, 64, .6)",      
        },

        created: function() {
            "use strict";

            this.centreX = this.width/2;
            this.centreY = this.height/2;

            this.radiusX = this.width*0.4;
            this.radiusY = this.height*0.4;
          
            //the four corners of the quad 
            this._x = new Array(4);     
            this._x[0] = 0;
            this._x[1] = 0;
            this._x[2] = - this.radiusX;
            this._x[3] = - this.radiusX;
            this._y = new Array(4);
            this._y[0] = 0;
            this._y[1] = - this.radiusY;
            this._y[2] = - this.radiusY;
            this._y[3] = 0;

            this._sy = new Array(4);
            this._sx = new Array(4);
            
            for (var i=1; i<4; i++) {
                this._sx[i] = Math.random()*2+1;
                this._sy[i] = Math.random()*2+1;
            }           
        },

        ready: function() {
            //Can't use strict here - polymer super() uses .caller() which throws an error in strct mode see 
            //http://stackoverflow.com/questions/16871050/inconsistent-scope-of-use-strict-on-different-web-browsers-concerning-argumen

            this.super();           
            this.backContext.translate(this.centreX, this.centreY);
            this.backContext.fillStyle = this.color;
           
        },

        drawQuad: function drawQuad(rotate) {
            "use strict";

            this.backContext.rotate(degreesToRadians(1*(360/this.totalQuads)));
            this.backContext.beginPath();
    
            this.backContext.moveTo( this._x[0], this._y[0]);
            this.backContext.lineTo( this._x[1], this._y[1]);
            this.backContext.lineTo( this._x[2], this._y[2]);
            this.backContext.lineTo( this._x[3], this._y[3]);

            this.backContext.closePath();
            this.backContext.fill();
        },

        animate: function animate() {
            "use strict";

            // Store the current transformation matrix
            this.backContext.save();

            // Use the identity matrix while clearing the canvas
            this.backContext.setTransform(1, 0, 0, 1, 0, 0);
            this.backContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Restore the transform
            this.backContext.restore();
        
            for (var i = 1; i<4; i++) {
                this._x[i] += this._sx[i];
                this._y[i] += this._sy[i];
                if (Math.abs(this._x[i]) > this.radiusX) this._sx[i] = - this._sx[i];
                if (Math.abs(this._y[i]) > this.radiusY) this._sy[i] = - this._sy[i];      
            }
                
            for(i = 0; i<this.totalQuads; i++) {
                this.drawQuad(this.rotation+1);
            }
    
            this.context.drawImage(this.backCanvas, 0, 0);  
            this.rotation++;
        },




    });
}());