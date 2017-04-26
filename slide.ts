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
        });


    }

    get active() {
        return this._active;
    }

    set active(value) {
        (value) ? this.classList.add('active') : this.classList.remove('active');
        this._active = value;

        if (value) {
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
    private _active: boolean;
    private _slideName: string;
    // private _template: ShadowRoot = this.attachShadow({mode: 'closed'});
    private _templateString: string;

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
