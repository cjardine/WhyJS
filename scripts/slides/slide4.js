/**
 * Created by Chris on 4/25/2017.
 */
(function () {
    /**
     * Created by Chris on 4/25/2017.
     */
    // import PartiOn from 'partiOn.js';
    function blood(width, height) {
        return {
            name: 'blood',
            x: width,
            y: height,
            maxParticles: 600,
            emissionRate: 4,
            shape: PartiOn.constants.particle.shapes.CIRCLE,
            colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
            gradientType: PartiOn.constants.particle.gradientTypes.RADIAL,
            startColor1: [150, 0, 0, 1],
            startColor2: [150, 0, 0, 1],
            endColor1: [150, 0, 0, 1],
            endColor2: [150, 0, 0, 1],
            colorVariance: 0,
            startSize: 800,
            endSize: 10,
            startSizeVariance: 0,
            endSizeVariance: 10,
            startSpeed: 0.5,
            endSpeed: 5,
            startSpeedVariance: 5,
            endSpeedVariance: 10,
            direction: 90,
            directionVariance: 5,
            startDirectionVariance: 0,
            endDirectionVariance: 15,
            duration: 6,
            durationVariance: 30
        };
    }
    function startParticles() {
        const canvas = document.getElementById('canvas-slide4');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.party = new PartiOn(canvas);
            canvas.party.addEmitter(blood(0, -400));
            canvas.party.setBackgroundColor('rgba(0,0,0,0)');
            canvas.party.setBlendMode('normal');
            let event = new CustomEvent('app.canvas.ready', {
                detail: { isReady: true }
            });
            canvas.dispatchEvent(event);
            console.log('PartiOn says HELLO!');
            document.addEventListener('app.resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }
        else {
            setTimeout(startParticles, 1000);
        }
    }
    startParticles();
}());
//# sourceMappingURL=slide4.js.map