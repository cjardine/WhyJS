/**
 * Created by Chris on 4/28/2017.
 */
class Sounds extends HTMLElement {
    constructor() {
        super();

        this._sounds = this.querySelectorAll('audio');

        Array.prototype.forEach.call(this._sounds, (sound: HTMLAudioElement, index: number) => {
            sound.volume = 0.1;
            document.addEventListener('app.sound.play.' + sound.getAttribute('id'), (event) => {
                sound.play();
            })
        });


    }

    private _sounds: NodeListOf<Element>;
}

window.customElements.define('wjs-sounds', Sounds);
