/**
 * Created by Chris on 4/10/2017.
 */
'use strict';

class SlideShow extends HTMLElement {
    constructor() {
        super();


        this._toolbar = <HTMLElement>this.querySelector('wjs-toolbar');
        this._button_next = <HTMLButtonElement>this._toolbar.querySelector('button.next');
        this._button_previous = <HTMLButtonElement>this._toolbar.querySelector('button.previous');
        this._shellSlides = this.querySelectorAll('wjs-slide');
        this._totalSlides = this._shellSlides.length;

        Array.prototype.forEach.call(this._shellSlides, (slide: Slide, index: number) => {
            slide.slideName = 'slide' + (index + 1);
        });

        this._button_next.addEventListener('click', (event) => {
            if (this._auth.isAuth) {
                this.next();
            }
        });

        this._button_previous.addEventListener('click', (event) => {
            if (this._auth.isAuth) {
                this.previous();
            }
        });

        document.addEventListener('app.auth.isAuth', (event: CustomEvent) => {
            this._toolbar.style.display = (event.detail.isAuth) ? 'block' : 'none';
        });

        document.addEventListener('DOMContentLoaded', (event: Event) => {
            Array.prototype.forEach.call(this._shellSlides, (slide: Slide, index: number) => {
                slide.slideName = 'slide' + (index + 1);
            });
        });

        this._slideNum.on('value', (snapshot) => {
            this.slide = snapshot.val();
        });
        this._slideNum.once('value').then((snapshot) => {
            this.slide = snapshot.val();
        });
    }

    get slide() {
        return this._index;
    }

    set slide(index: number) {
        if (index !== this._index) {
            if (this._auth.isAuth) {
                this._slideNum.set(index);
            }
            this._setVisibility(index, this._index);
            this._index = index;
        }

        this._button_previous.disabled = (this.slide === 0 || this.slide === undefined);
        this._button_next.disabled = (this.slide === (this._totalSlides - 1));
    }

    next() {
        if (this.slide < (this._totalSlides - 1))
            this.slide = this.slide + 1;
        else if (this.slide === undefined)
            this.slide = 0;
    }

    previous() {
        if (this.slide > 0)
            this.slide = this.slide - 1;
    }

    private _database = window['whyJS'].firebase.database();
    private _auth = window['whyJS'].authorization;
    private _slideNum = this._database.ref('slide_number');
    private _shellSlides: NodeList = undefined;
    private _totalSlides: number = undefined;
    private _toolbar: HTMLElement = undefined;
    private _button_next: HTMLButtonElement = undefined;
    private _button_previous: HTMLButtonElement = undefined;
    private _index: number = undefined;


    private _setVisibility(newValue: number, oldValue: number) {
        this.classList.remove('hide');
        Array.prototype.forEach.call(this._shellSlides, (slide: Slide, index: number) => {
            if (oldValue === undefined || newValue > oldValue) {
                slide.classList.remove('slide-in-left', 'slide-out-left', 'slide-in-right', 'slide-out-right');
                if (newValue === index) {
                    slide.classList.add('slide-in-right');
                    slide.active = true;
                } else {
                    slide.active = false;
                    if (newValue < index) {
                        slide.classList.add('slide-out-left');
                    } else {
                        slide.classList.add('slide-out-right');
                    }
                }
            } else if (newValue < oldValue) {
                slide.classList.remove('slide-in-left', 'slide-out-left', 'slide-in-right', 'slide-out-right');
                if (newValue === index) {
                    slide.classList.add('slide-in-left');
                    slide.active = true;
                } else {
                    slide.active = false;
                    if (newValue < index) {
                        slide.classList.add('slide-out-left');
                    } else {
                        slide.classList.add('slide-out-right');
                    }
                }
            }
        })
    }
}
window.customElements.define('wjs-slide-show', SlideShow);
