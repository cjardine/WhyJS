/*
 Welcome to PartiOn!
 ================================================================================================
 The most fun with particle emitters you'll (probably) ever have!

 */




/////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * PartiOn: The fun and easy particle library
 * @param {Element} [canvas]
 * @constructor
 */
function PartiOn(canvas) {
  this.canvas = null;
  this.showGenerator = false;

  this.canvasContext = null;

  if (canvas) {
    this.setCanvas(canvas);
  }
  this.emitters = [];
}


/////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
/////////////////////////////////////////////////////////////////////////////////////////////////
PartiOn.constants = {
  particle: {
    shapes: {
      SQUARE: 'SQUARE',
      CIRCLE: 'CIRCLE'
    },
    colorTypes: {
      SOLID: 'SOLID',
      GRADIENT: 'GRADIENT'
    },
    gradientTypes: {
      VERTICAL: 'VERTICAL',
      HORIZONTAL: 'HORIZONTAL',
      RADIAL: 'RADIAL'
    }
  },
  canvas: {
    blendModes: {
      "NORMAL": "normal",
      "MULTIPLY": "multiply",
      "SCREEN": "screen",
      "OVERLAY": "overlay",
      "DARKEN": "darken",
      "LIGHTEN": "lighten",
      "COLOR_DODGE": "color-dodge",
      "COLOR_BURN": "color-burn",
      "HARD_LIGHT": "hard-light",
      "SOFT_LIGHT": "soft-light",
      "DIFFERENCE": "difference",
      "EXCLUSION": "exclusion",
      "HUE": "hue",
      "SATURATION": "saturation",
      "COLOR": "color",
      "LUMINOSITY": "luminosity",
      "SOURCE_OVER": "source-over",
      "SOURCE_IN": "source-in",
      "SOURCE_OUT": "source-out",
      "SOURCE_ATOP": "source-atop",
      "DESTINATION_IN": "destination-in",
      "DESTINATION_OUT": "destination-out",
      "DESTINATION_ATOP": "destination-atop",
      "LIGHTER": "lighter",
      "COPY": "copy",
      "XOR": "xor"
    }
  },
  emitter: {}
};


/////////////////////////////////////////////////////////////////////////////////////////////////
// SET METHODS
/////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * setCanvas
 * @param {Element} canvas
 */
PartiOn.prototype.setCanvas = function (canvas) {
  if (canvas.nodeName === 'CANVAS') {
    this.canvas = canvas;
    this.canvasContext = this.canvas.getContext('2d');
  }
};

PartiOn.prototype.setBackgroundColor = function (color) {
  if (this._checkCanvas()) {
    this.canvas.style.backgroundColor = color;
  }
};

PartiOn.prototype.setBlendMode = function (blendMode) {
  if (this._checkCanvas()) {
    this.canvasContext.globalCompositeOperation = blendMode;
  }
};


PartiOn.prototype.addEmitter = function (options) {
  if (this._checkCanvas()) {
    var wasEmpty = (this.emitters.length === 0);
    this.emitters.push(new Emitter(options));
    if (wasEmpty && (this.emitters.length === 1)) {
      this._runLoop();
    }
  }
};

PartiOn.prototype.clearCanvas = function () {
  if (this._checkCanvas()) {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};


/////////////////////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
/////////////////////////////////////////////////////////////////////////////////////////////////
PartiOn.prototype._checkCanvas = function () {
  if (this.canvas && this.canvasContext && this.canvas.constructor.name === "HTMLCanvasElement" && this.canvasContext.constructor.name === "CanvasRenderingContext2D") {
    return true;
  } else {
    console.error('No canvas or canvas context available. Use "setCanvas" with a valid canvas element, then add emitter.');
    return false;
  }
};

PartiOn.prototype._runLoop = function (instance) {
  var context = instance || this;
  context.clearCanvas();
  context._updateEmitters();
  if (context.emitters.length > 0) {
    context.queue();
  }
};

PartiOn.prototype._updateEmitters = function () {
  var currentEmitter;
  for (var iteration = 0; iteration < this.emitters.length; iteration++) {
    currentEmitter = this.emitters[iteration];
    currentEmitter.update();
    this._drawParticles(currentEmitter);
  }
};

PartiOn.prototype._drawParticles = function (emitter) {
  var currentParticle;
  var gradient,
    r, g, b, a;
  for (var iteration = 0; iteration < emitter.pool.length; iteration++) {
    currentParticle = emitter.pool[iteration];
    if (currentParticle.active) {
      currentParticle.speed = currentParticle.speed + currentParticle.speedTheta;

      currentParticle.position = {
        x: ((currentParticle.directions.x * currentParticle.speed) + currentParticle.position.x),
        y: ((currentParticle.directions.y * currentParticle.speed) + currentParticle.position.y)
      };

      currentParticle.size = Math.abs((currentParticle.size + currentParticle.sizeTheta));


      if (!(((currentParticle.directions.y + currentParticle.size / 2) < 0) ||
        ((currentParticle.directions.y - currentParticle.size / 2) > this.canvas.height) ||
        ((currentParticle.directions.x + currentParticle.size / 2) < 0) ||
        ((currentParticle.directions.x - currentParticle.size / 2) > this.canvas.width))) {
        this.canvasContext.beginPath();
        gradient = this.canvasContext.createRadialGradient(currentParticle.position.x, currentParticle.position.y, (currentParticle.size / 2), currentParticle.position.x, currentParticle.position.y, 0);

        r = Math.round(currentParticle.color1[0] + currentParticle.color1Theta[0]);
        g = Math.round(currentParticle.color1[1] + currentParticle.color1Theta[1]);
        b = Math.round(currentParticle.color1[2] + currentParticle.color1Theta[2]);
        a = (currentParticle.color1[3] + currentParticle.color1Theta[3]);

        currentParticle.color1 = [r, g, b, a];
        gradient.addColorStop(1, "rgba(" + r + ", " + g + ", " + b + ", " + a + ")");

        r = Math.round(currentParticle.color2[0] + currentParticle.color2Theta[0]);
        g = Math.round(currentParticle.color2[1] + currentParticle.color2Theta[1]);
        b = Math.round(currentParticle.color2[2] + currentParticle.color2Theta[2]);
        a = (currentParticle.color2[3] + currentParticle.color2Theta[3]);

        currentParticle.color2 = [r, g, b, a];
        gradient.addColorStop(0, "rgba(" + r + ", " + g + ", " + b + ", " + a + ")");


        this.canvasContext.arc(currentParticle.position.x, currentParticle.position.y, (currentParticle.size / 2), 0, 2 * Math.PI, false);
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.fill();
        this.canvasContext.closePath();
      }
    }
  }
};

PartiOn.prototype.queue = function () {
  var partiOn = this;
  window.requestAnimationFrame(function () {
    partiOn._runLoop(partiOn);
  });
};
