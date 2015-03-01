'use strict';

(function () {

    function degreesToRadians(degrees) {
        return degrees * (Math.PI /180);
    }

    return new Polymer('cm-interactive-circles', {
    	               
        publish: {
                 
        },

        created: function() {
           
        },

        ready: function() {
            this.circles = this.$.circles;
            this.slider = this.$.slider;
            this.slider.addEventListener('change', this.controlCircles.bind(this));
        },

        controlCircles: function controlCircles(e) {
             // console.log('value:' + this.slider.immediateValue);
             this.circles.totalCircles = this.slider.immediateValue;
        },
 });
}());