/////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
/////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param options
 * @constructor
 */
function Emitter(options) {
    try {
        this.options = options;
        this.toBeEmitted = 0;
        this.randomMultiplier = 5;
        this.x = options.x;
        this.y = options.y;
        this.pool = [];
        this.randoms = [];
        this.totalRandoms = this.options.maxParticles * this.randomMultiplier;
        this.randomIndex = 0;
        for (var randomIndex = 0; randomIndex < this.totalRandoms; randomIndex++) {
            this.randoms.push(Math.round10(Math.random(), -10));
        }
        for (var particleIndex = 0; particleIndex < this.options.maxParticles; particleIndex++) {
            this.pool.push(new Particle());
        }
    }
    catch (e) {
        console.error("PartiOn: Unable to instantiate emitter. " + e);
    }
}
Emitter.prototype.update = function () {
    this.toBeEmitted = this.toBeEmitted + this.options.emissionRate;
    for (var particleIndex = 0; particleIndex < this.pool.length; particleIndex++) {
        var currentParticle = this.pool[particleIndex];
        currentParticle.update();
        if (this.toBeEmitted >= 1) {
            if (!currentParticle.active) {
                this._activateParticle(currentParticle);
                this.toBeEmitted = this.toBeEmitted - 1;
            }
        }
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
/////////////////////////////////////////////////////////////////////////////////////////////////
Emitter.prototype._validateRequiredOptions = function () {
};
Emitter.prototype._getRandom = function () {
    this.randomIndex = this.randomIndex + 1;
    if (this.randomIndex === this.totalRandoms) {
        this.randomIndex = 0;
    }
    return this.randoms[this.randomIndex];
};
Emitter.prototype._calculateVariance = function (value, variance) {
    var actualVariance = this._getRandom() * variance;
    var positivity = (this._getRandom() < 0.5) ? -1 : 1;
    return value + (positivity * (value * (actualVariance / 100)));
};
Emitter.prototype._calculateColorVariance = function (value, variance) {
    var actualVariance = this._getRandom() * variance;
    var positivity = (this._getRandom() < 0.5) ? -1 : 1;
    var ret = Math.floor(value + (positivity * (value * (actualVariance / 100))));
    if (ret < 0) {
        ret = 0;
    }
    else if (ret > 255) {
        ret = 255;
    }
    return ret;
};
Emitter.prototype._activateParticle = function (currentParticle) {
    var duration, endSize, sizeDelta, endSpeed, speedDelta, direction, directionPositivity, radians, endColor1 = [], endColor2 = [];
    // Calculate the total cycles this particle will live for
    duration = this._calculateVariance(this.options.duration, this.options.durationVariance);
    currentParticle.steps = Math.round(duration * 60); // 60 Hz
    // Calculate the incremental size change over time
    currentParticle.size = this._calculateVariance(this.options.startSize, this.options.startSizeVariance);
    endSize = this._calculateVariance(this.options.endSize, this.options.endSizeVariance);
    sizeDelta = endSize - currentParticle.size;
    currentParticle.sizeTheta = (sizeDelta / currentParticle.steps);
    // Calculate the incremental speed change over time
    currentParticle.speed = this._calculateVariance(this.options.startSpeed, this.options.startSpeedVariance);
    endSpeed = this._calculateVariance(this.options.endSpeed, this.options.endSpeedVariance);
    speedDelta = endSpeed - currentParticle.speed;
    currentParticle.speedTheta = (speedDelta / currentParticle.steps);
    // Calculate the direction of the particle
    directionPositivity = (this._getRandom() < 0.5) ? -1 : 1;
    direction = this.options.direction + (Math.round(this._getRandom() * (this.options.directionVariance / 2)) * directionPositivity);
    radians = direction * Math.PI / 180;
    currentParticle.directions = {
        x: Math.cos(radians),
        y: Math.sin(radians)
    };
    for (var colorValue = 0; colorValue < this.options.startColor1.length; colorValue++) {
        if (colorValue < 3) {
            currentParticle.color1.push(this._calculateColorVariance(this.options.startColor1[colorValue], this.options.colorVariance));
            endColor1.push(this._calculateColorVariance(this.options.endColor1[colorValue], this.options.colorVariance));
            currentParticle.color1Theta.push(((endColor1[colorValue] - currentParticle.color1[colorValue]) / currentParticle.steps));
            currentParticle.color2.push(this._calculateColorVariance(this.options.startColor2[colorValue], this.options.colorVariance));
            endColor2.push(this._calculateColorVariance(this.options.endColor2[colorValue], this.options.colorVariance));
            currentParticle.color2Theta.push(((endColor2[colorValue] - currentParticle.color2[colorValue]) / currentParticle.steps));
        }
        else {
            currentParticle.color1.push(this.options.startColor1[colorValue]);
            endColor1.push(this.options.endColor1[colorValue]);
            currentParticle.color1Theta.push(Math.floor10((endColor1[colorValue] - currentParticle.color1[colorValue]) / currentParticle.steps, -10));
            currentParticle.color2.push(this.options.startColor2[colorValue]);
            endColor2.push(this.options.endColor2[colorValue]);
            currentParticle.color2Theta.push(Math.floor10((endColor2[colorValue] - currentParticle.color2[colorValue]) / currentParticle.steps, -10));
        }
    }
    currentParticle.position = { x: this.options.x, y: this.options.y };
    currentParticle.active = true;
};
//# sourceMappingURL=emitter.js.map