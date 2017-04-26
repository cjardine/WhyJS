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

        this._FBApp = firebase.initializeApp(config);
        this._authorization = document.querySelector('wjs-authorization-tools');
        this._slideShow = document.querySelector('wjs-slide-show');
        this._applicationContainer = document.querySelector('#application');


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

    private _FBApp;
    private _authorization;
    private _slideShow;
    private _applicationContainer;
}

window['whyJS'] = new Application();

