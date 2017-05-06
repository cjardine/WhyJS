/**
 * Created by Chris on 4/24/2017.
 */
class Application {
    constructor() {
        'use strict';
        // Initialize Firebase
        let config = {
            apiKey: "AIzaSyDQFf3BRccyuDoDRlpOi5l8NotkUvbMzjI",
            authDomain: "slides-bdbb1.firebaseapp.com",
            databaseURL: "https://slides-bdbb1.firebaseio.com",
            projectId: "slides-bdbb1",
            storageBucket: "slides-bdbb1.appspot.com",
            messagingSenderId: "855398198087"
        };
        let debounceTimer = null;
        let debounceEvent;
        this._applicationContainer = document.querySelector('#application');
        this._FBApp = firebase.initializeApp(config);
        this._authorization = document.querySelector('wjs-authorization-tools');
        this._slideShow = document.querySelector('wjs-slide-show');
        document.addEventListener('resize', (event) => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
                debounceTimer = null;
            }
            debounceTimer = setTimeout(() => {
                debounceEvent = new Event('app.resize');
                document.dispatchEvent(debounceEvent);
                clearTimeout(debounceTimer);
                debounceTimer = null;
            }, 500);
        });
    }
    get firebase() {
        return this._FBApp;
    }
    get authorization() {
        return this._authorization;
    }
    get slideShow() {
        return this._slideShow;
    }
}
window['whyJS'] = new Application();
//# sourceMappingURL=application.js.map