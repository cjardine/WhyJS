/**
 * Created by Chris on 4/25/2017.
 */

class Slide extends HTMLElement {
    constructor() {
        super();

        this._src = this.getAttribute('src');
        fetch(this._src).then((response) => {
            if (response.ok) {
                return response.text();
            }
        }).then((html) => {
            this._templateString = html;
            this.innerHTML = this.parseTpl(this._templateString, this, '*');
        });


    }

    get active() {
        return this._active;
    }

    set active(value) {
        (value) ? this.classList.add('active') : this.classList.remove('active');
        this._active = value;
    }

    get slideName() {
        return this._slideName;
    }

    set slideName(name:string) {
        this._slideName = name;
        this.innerHTML = this.parseTpl(this._templateString, this, '*');
    }


    private _src;
    private _active: boolean;
    private _slideName: string;
    // private _template: ShadowRoot = this.attachShadow({mode: 'closed'});
    private _templateString: string;

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
