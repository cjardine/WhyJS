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
            maxParticles: 500,
            emissionRate: 1,
            shape: PartiOn.constants.particle.shapes.SQUARE,
            colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
            gradientType: PartiOn.constants.particle.gradientTypes.VERTICAL,
            startColor1: [0, 0, 0, 1],
            startColor2: [0, 0, 0, 1],
            endColor1: [0, 0, 0, 0],
            endColor2: [0, 0, 0, 0],
            colorVariance: 5,
            startSize: 5,
            endSize: 5,
            startSizeVariance: 25,
            endSizeVariance: 50,
            startSpeed: 1,
            endSpeed: 3,
            startSpeedVariance: 50,
            endSpeedVariance: 10,
            direction: 0,
            directionVariance: 360,
            startDirectionVariance: 30,
            endDirectionVariance: 100,
            duration: 5,
            durationVariance: 50
        }
    }


    function startParticles() {
        const canvas = <PartiOnHTMLCanvasElement>document.getElementById('canvas-slide5');

        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.party = new PartiOn(canvas);
            // party.addEmitter(bats(window.innerWidth * 0.8, window.innerHeight));
            canvas.party.addEmitter(burning(window.innerWidth * 0.8, window.innerHeight*0.60));
            canvas.party.setBackgroundColor('rgba(0,0,0,0)');
            canvas.party.setBlendMode('normal');

            let event = new CustomEvent('app.canvas.ready', {
                detail: {isReady: true}
            });
            canvas.dispatchEvent(event);

            console.log('PartiOn says HELLO!');
            document.addEventListener('app.resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        } else {
            setTimeout(startParticles, 1000);
        }
    }

    startParticles();
}());
