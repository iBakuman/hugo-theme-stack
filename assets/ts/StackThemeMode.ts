import { ThemeStorage } from './storage/ThemeStorage';

export class StackThemeMode {

    constructor(private _storage: ThemeStorage, private _toggleEl: HTMLElement = null) {
        this.bindMatchMedia();
        this.dispatchEvent(document.documentElement.dataset.scheme as ThemeMode);

        if (_toggleEl)
            this.bindClick();

        if (document.body.style.transition == '')
            document.body.style.setProperty('transition', 'background-color .3s ease');
    }

    private dispatchEvent(themeMode: ThemeMode) {
        const event = new CustomEvent('onThemeModeChange', {
            detail: themeMode
        });
        window.dispatchEvent(event);
    }

    private bindMatchMedia() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                this._storage.sysPreferMode = 'dark';
            }
            else {
                this._storage.sysPreferMode = 'light';
            }
            this.setBodyClass();
        });
    }

    private setBodyClass() {
        if (this._storage.isDark()) {
            document.documentElement.dataset.scheme = 'dark';
        }
        else {
            document.documentElement.dataset.scheme = 'light';
        }

        this.dispatchEvent(document.documentElement.dataset.scheme as ThemeMode);
    }

    private bindClick() {
        this._toggleEl.addEventListener('click', (e) => {
            if (this._storage.isDark()) {
                /// Disable dark mode
                this._storage.themeMode = 'light';
            }
            else {
                this._storage.themeMode = 'dark';
            }

            this.setBodyClass();

            if (this._storage.themeMode == this._storage.sysPreferMode) {
                /// Set to auto
                this._storage.themeMode = 'auto';
            }
        })
    }
}
