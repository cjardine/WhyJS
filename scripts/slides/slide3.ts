(function () {
    /**
     * Created by Chris on 4/25/2017.
     */
// import PartiOn from 'partiOn.js';

    const shapes = {
        SQUARE: 'SQUARE',
        CIRCLE: 'CIRCLE'
    };

    const colorTypes = {
        SOLID: 'SOLID',
        GRADIENT: 'GRADIENT'
    };

    const gradientTypes = {
        VERTICAL: 'VERTICAL',
        HORIZONTAL: 'HORIZONTAL',
        RADIAL: 'RADIAL'
    };

    function envious(width, height) {
        return {
            name: 'envious',
            x: width,
            y: height,
            maxParticles: 300,
            emissionRate: 1,
            shape: shapes.CIRCLE,
            colorType: colorTypes.GRADIENT,
            gradientType: gradientTypes.RADIAL,
            startColor1: [100, 150, 244, 1],
            startColor2: [200, 220, 255, 0],
            endColor1: [0, 25, 50, 0],
            endColor2: [0, 50, 100, 0],
            colorVariance: 2,
            startSize: 200,
            endSize: 50,
            startSizeVariance: 100,
            endSizeVariance: 600,
            startSpeed: 1,
            endSpeed: 3,
            startSpeedVariance: 50,
            endSpeedVariance: 10,
            direction: -90,
            directionVariance: 180,
            startDirectionVariance: 30,
            endDirectionVariance: 100,
            duration: 6,
            durationVariance: 10
        }
    }

    function burning(width, height) {
        return {
            name: 'burning',
            x: width,
            y: height,
            maxParticles: 100,
            emissionRate: 2,
            shape: shapes.CIRCLE,
            colorType: colorTypes.GRADIENT,
            gradientType: gradientTypes.RADIAL,
            startColor1: [255, 255, 100, 1],
            startColor2: [255, 255, 100, 0],
            endColor1: [50, 0, 0, 0],
            endColor2: [10, 0, 0, 0],
            colorVariance: 5,
            startSize: 100,
            endSize: 50,
            startSizeVariance: 100,
            endSizeVariance: 600,
            startSpeed: 1,
            endSpeed: 3,
            startSpeedVariance: 50,
            endSpeedVariance: 10,
            direction: -45,
            directionVariance: 180,
            startDirectionVariance: 30,
            endDirectionVariance: 100,
            duration: 10,
            durationVariance: 10
        }
    }

    function bats(width, height) {
        return {
            name: 'bats',
            x: width,
            y: height,
            maxParticles: 1000,
            emissionRate: 1,
            shape: shapes.CIRCLE,
            colorType: colorTypes.GRADIENT,
            gradientType: gradientTypes.RADIAL,
            startColor1: [0, 0, 0, 1],
            startColor2: [0, 0, 0, 1],
            endColor1: [0, 0, 0, 0],
            endColor2: [0, 0, 0, 0],
            colorVariance: 10,
            startSize: 3,
            endSize: 1,
            startSizeVariance: 100,
            endSizeVariance: 300,
            startSpeed: 5,
            endSpeed: 10,
            startSpeedVariance: 50,
            endSpeedVariance: 50,
            direction: -90,
            directionVariance: 180,
            startDirectionVariance: 30,
            endDirectionVariance: 100,
            duration: 5,
            durationVariance: 50
        }
    }

    function startParticles() {
        const canvas = <PartiOnHTMLCanvasElement>document.getElementById('canvas-slide3');

        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.party = new PartiOn(canvas);
            canvas.party.addEmitter(bats(window.innerWidth * 0.75, window.innerHeight));
            canvas.party.addEmitter(envious(window.innerWidth * 0.75, window.innerHeight));
            canvas.party.setBackgroundColor('rgba(0,0,0,0.7)');
            canvas.party.setBlendMode(PartiOn.constants.canvas.blendModes.COLOR_DODGE);

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
