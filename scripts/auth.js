/**
 * Created by Chris on 4/24/2017.
 */
'use strict';
class Auth extends HTMLElement {
    constructor() {
        super();
        this._auth = window['whyJS'].firebase.auth();
        this._auth_email = undefined;
        this._auth_password = undefined;
        this._auth_submit = undefined;
        this._auth_collapsed = undefined;
        this._doScreenExpand = undefined;
        this._doScreenContract = undefined;
        this._auth_form = undefined;
        this._isAuth = false;
        this._isCollapsed = true;
        this._isFullScreen = false;
        const template = this.attachShadow({ mode: 'closed' });
        template.innerHTML = `
                            <link type="text/css" rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.min.css">
                            <link type="text/css" rel="stylesheet" href="styles/base.css">
                            <link type="text/css" rel="stylesheet" href="styles/auth.css">
                            
                            <div class="fa fa-bars" id="isCollapsed"></div>
                            <div class="form" id="form">
                                <input type="text" id="auth_email" placeholder="Email">
                                <input type="password" id="auth_password" placeholder="Password">
                                <button id="auth_submit">Submit</button>
                            </div>
                            <div class="fa fa-expand doScreenExpand"></div>
                            <div class="fa fa-compress doScreenContract"></div>
`;
        this._auth_email = template.querySelector('#auth_email');
        this._auth_password = template.querySelector('#auth_password');
        this._auth_submit = template.querySelector('#auth_submit');
        this._auth_collapsed = template.querySelector('#isCollapsed');
        this._auth_form = template.querySelector('#form');
        this._doScreenExpand = template.querySelector('.doScreenExpand');
        this._doScreenContract = template.querySelector('.doScreenContract');
        this._isAuth = undefined;
        this._doScreenContract.addEventListener('click', (event) => {
            this.isFullScreen = false;
        });
        this._doScreenExpand.addEventListener('click', (event) => {
            this.isFullScreen = true;
        });
        this._auth_collapsed.addEventListener('click', (event) => {
            this.isCollapsed = !this._isCollapsed;
        });
        document.onwebkitfullscreenchange = (event) => {
            if (this.isFullScreen !== document.webkitIsFullScreen) {
                this.isFullScreen = document.webkitIsFullScreen;
            }
        };
        this._auth_submit.addEventListener('click', (event) => {
            this._doAuth(this._auth_email.value, this._auth_password.value);
        });
        this._auth.onAuthStateChanged((user) => {
            let event;
            let isAuth = (user !== null);
            if (this.isAuth !== isAuth) {
                this.isAuth = isAuth;
                event = new CustomEvent('app.auth.isAuth', {
                    detail: { isAuth: isAuth, user: user }
                });
                document.dispatchEvent(event);
            }
        });
        this.isCollapsed = true;
        this.isFullScreen = false;
    }
    get isAuth() {
        return this._isAuth;
    }
    set isAuth(value) {
        if (typeof value === 'boolean') {
            this._isAuth = value;
        }
    }
    get isCollapsed() {
        return this._isCollapsed;
    }
    set isCollapsed(value) {
        if (typeof value === 'boolean') {
            this._isCollapsed = value;
            (this._isCollapsed) ? this._auth_form.classList.add('hide') : this._auth_form.classList.remove('hide');
        }
    }
    set isFullScreen(value) {
        this._isFullScreen = value;
        if (value) {
            this._doScreenExpand.style.display = 'none';
            this._doScreenContract.style.display = 'block';
            document.body.webkitRequestFullscreen();
        }
        else {
            this._doScreenExpand.style.display = 'block';
            this._doScreenContract.style.display = 'none';
            document.webkitExitFullscreen();
        }
    }
    get isFullScreen() {
        return this._isFullScreen;
    }
    _doAuth(email, password) {
        this._auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }
}
window.customElements.define('wjs-authorization-tools', Auth);
//# sourceMappingURL=auth.js.map