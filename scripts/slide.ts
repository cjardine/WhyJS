/**
 * Created by Chris on 4/25/2017.
 */

class Slide extends HTMLElement {
    constructor() {
        super();

        this._src = this.getAttribute('src');
        this._controller = this.getAttribute('controller');
        fetch(this._src).then((response) => {
            if (response.ok) {
                return response.text();
            }
        }).then((html) => {
            this._templateString = html;
            this.classList.add(this.slideName + '-container');
            this._appendTemplate(this.parseTpl(this._templateString, this, '*'));
            // this._appendController();
            this._canvas = <PartiOnHTMLCanvasElement>this.querySelector('canvas');
            if (this._canvas) {
                if (this._isAuth) {
                    this._enableCanvasDD();
                }
                this._canvas.addEventListener('app.canvas.ready', (event) => {
                    this._canvas.party.active = this.active;
                });
            }
        });
        this.style.visibility = 'collapse';


        document.addEventListener('app.auth.isAuth', (authEvent: CustomEvent) => {
            this._isAuth = authEvent.detail.isAuth;
            if (this._isAuth && this._canvas)
                this._enableCanvasDD();
        });
    }

    get active() {
        return this._active;
    }

    set active(value) {
        this._active = value;
        (value) ? this.classList.add('active') : this.classList.remove('active');
        if (this._canvas && this._canvas.party) {
            this._canvas.party.active = value;
        }
        if (value) {
            this.style.visibility = 'visible';
            this.style.display = 'block'
        } else {
            setTimeout(() => {
                if (!this.active) {
                    this.style.display = 'none';
                }
            }, 6000);
        }
    }

    get slideName() {
        return this._slideName;
    }

    set slideName(name: string) {
        this._slideName = name;
        this.classList.add(name + '-container');
        this._appendTemplate(this.parseTpl(this._templateString, this, '*'));
        // this._appendController();
    }


    private _src;
    private _controller;
    private _active: boolean = false;
    private _slideName: string;
    // private _template: ShadowRoot = this.attachShadow({mode: 'closed'});
    private _templateString: string;
    private _canvas: PartiOnHTMLCanvasElement;
    private _isAuth: Boolean = false;

    private _enableCanvasDD() {
        let dd: HTMLSelectElement = document.createElement('select');
        dd.style.position = 'absolute';
        dd.style.top = '0';
        dd.style.right = '0';
        let blendModes = PartiOn.constants.canvas.blendModes;
        for (let key in blendModes) {
            if (blendModes.hasOwnProperty(key)) {
                let currentMode: string = blendModes[key];
                let option = document.createElement('option');
                option.setAttribute('value', currentMode);
                option.innerText = currentMode;
                dd.appendChild(option);
            }
        }

        this.appendChild(dd);
        dd.addEventListener('change', (event) => {
            this._canvas.party.setBlendMode(dd.value);
        });
    }

    private _appendTemplate(strHTML) {
        let output = document.createRange().createContextualFragment(strHTML);
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        this.appendChild(output);
    }

    private _appendController() {
        let script;
        if (this._controller) {
            let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', this._controller);
            this.appendChild(script);
        }
    }

    private getPath(path, obj, fb = `$\{${path}}`) {
        const output = path.split('.').reduce((res, key) => {
            return res[key] || fb;
        }, obj);

        return output;
    }

    private parseTpl(template, map, fallback) {
        return template.replace(/\$\{.+?}/g, (match) => {
            const path = match.substr(2, match.length - 3).trim();
            const output = this.getPath(path, map, fallback);

            return output;
        });
    }

}

window.customElements.define('wjs-slide', Slide);
