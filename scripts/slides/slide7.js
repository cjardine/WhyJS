/**
 * Created by Chris on 4/25/2017.
 */
(function () {
    /**
     * Created by Chris on 4/25/2017.
     */
    // import PartiOn from 'partiOn.js';
    function burning(width, height) {
        return {
            name: 'burning',
            x: width,
            y: height,
            maxParticles: 300,
            emissionRate: 2,
            shape: PartiOn.constants.particle.shapes.CIRCLE,
            colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
            gradientType: PartiOn.constants.particle.gradientTypes.VERTICAL,
            startColor1: [200, 200, 200, 0.7],
            startColor2: [200, 200, 200, 0],
            endColor1: [100, 100, 100, 0],
            endColor2: [100, 100, 100, 0],
            colorVariance: 5,
            startSize: 3,
            endSize: 5,
            startSizeVariance: 200,
            endSizeVariance: 100,
            startSpeed: 2,
            endSpeed: 10,
            startSpeedVariance: 50,
            endSpeedVariance: 10,
            direction: 0,
            directionVariance: 30,
            startDirectionVariance: 100,
            endDirectionVariance: 100,
            duration: 5,
            durationVariance: 50
        };
    }
    function snow(width, height) {
        return {
            name: 'snow',
            x: width,
            y: height,
            maxParticles: 100,
            emissionRate: 1,
            shape: PartiOn.constants.particle.shapes.CIRCLE,
            colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
            gradientType: PartiOn.constants.particle.gradientTypes.VERTICAL,
            startColor1: [255, 255, 255, 1],
            startColor2: [255, 255, 255, 0.3],
            endColor1: [255, 255, 255, 0.5],
            endColor2: [255, 255, 255, 0],
            colorVariance: 5,
            startSize: 3,
            endSize: 3,
            startSizeVariance: 100,
            endSizeVariance: 100,
            startSpeed: 2,
            endSpeed: 8,
            startSpeedVariance: 50,
            endSpeedVariance: 10,
            direction: 0,
            directionVariance: 30,
            startDirectionVariance: 100,
            endDirectionVariance: 100,
            duration: 4,
            durationVariance: 50
        };
    }
    function startParticles() {
        const canvas = document.getElementById('canvas-slide7');
        let event;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.party = new PartiOn(canvas);
            // party.addEmitter(bats(window.innerWidth * 0.8, window.innerHeight));
            canvas.party.addEmitter(snow(-300, window.innerHeight));
            canvas.party.addEmitter(snow(-300, window.innerHeight * 0.75));
            canvas.party.addEmitter(snow(-300, window.innerHeight * 0.5));
            canvas.party.addEmitter(snow(-300, window.innerHeight * 0.25));
            canvas.party.addEmitter(snow(-300, 0));
            // canvas.party.addEmitter(bats(window.innerWidth * 0.3, window.innerHeight*0.60));
            canvas.party.setBackgroundColor('rgba(0,0,0,0)');
            canvas.party.setBlendMode(PartiOn.constants.canvas.blendModes.COLOR_DODGE);
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
//# sourceMappingURL=slide7.js.map