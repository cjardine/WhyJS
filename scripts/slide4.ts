/**
 * Created by Chris on 4/25/2017.
 */
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
            maxParticles: 100,
            emissionRate: 0.5,
            shape: shapes.CIRCLE,
            colorType: colorTypes.GRADIENT,
            gradientType: gradientTypes.RADIAL,
            startColor1: [0, 0, 0, 1],
            startColor2: [50, 50, 50, 0],
            endColor1: [100, 50, 0, 0],
            endColor2: [50, 10, 0, 0],
            colorVariance: 1,
            startSize: 100,
            endSize: 500,
            startSizeVariance: 50,
            endSizeVariance: 100,
            startSpeed: 1,
            endSpeed: 3,
            startSpeedVariance: 10,
            endSpeedVariance: 10,
            direction: -90,
            directionVariance: 180,
            startDirectionVariance: 30,
            endDirectionVariance: 100,
            duration: 10,
            durationVariance: 90
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
            startColor1: [0, 0, 0, 1],
            startColor2: [0, 0, 0, 0],
            endColor1: [50, 0, 0, 0],
            endColor2: [10, 0, 0, 0],
            colorVariance: 5,
            startSize: 10,
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
            duration: 3,
            durationVariance: 10
        }
    }

    function bats(width, height) {
        return {
            name: 'bats',
            x: width,
            y: height,
            maxParticles: 400,
            emissionRate: 4,
            shape: shapes.CIRCLE,
            colorType: colorTypes.GRADIENT,
            gradientType: gradientTypes.RADIAL,
            startColor1: [150, 0, 0, 1],
            startColor2: [150, 0, 0, 1],
            endColor1: [150, 0, 0, 1],
            endColor2: [150, 0, 0, 1],
            colorVariance: 0,
            startSize: 800,
            endSize: 10,
            startSizeVariance: 0,
            endSizeVariance: 20,
            startSpeed: 5,
            endSpeed: 15,
            startSpeedVariance: 5,
            endSpeedVariance: 10,
            direction: 90,
            directionVariance: 10,
            startDirectionVariance: 50,
            endDirectionVariance: 30,
            duration: 1,
            durationVariance: 90
        }
    }

    function startParticles() {
        const canvas = <HTMLCanvasElement>document.getElementById('canvas-slide4');

        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const party = new PartiOn(canvas);
            // party.addEmitter(bats(window.innerWidth * 0.8, window.innerHeight));
            party.addEmitter(bats(window.innerWidth * 0.2, -600));
            party.setBackgroundColor('rgba(0,0,0,0)');
            party.setBlendMode('normal');


            let parent = canvas.parentNode;
            let dd:HTMLSelectElement = document.createElement('select');
            dd.style.position = 'absolute';
            dd.style.top = '0';
            dd.style.right = '0';
            let blendModes:{string:string} = PartiOn.constants.canvas.blendModes;
            for (let key in blendModes) {
                if (blendModes.hasOwnProperty(key)) {
                    let currentMode:string = blendModes[key];
                    let option = document.createElement('option');
                    option.setAttribute('value', currentMode);
                    option.innerText = currentMode;
                    dd.appendChild(option);
                }
            }

            parent.appendChild(dd);
            dd.addEventListener('change', (event) => {
                party.setBlendMode(dd.value);
            });

            console.log('PartiOn says HELLO!');
        } else {
            setTimeout(startParticles, 1000);
        }
    }

    startParticles();
}());
