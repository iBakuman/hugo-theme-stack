import { Feature } from '../Feature';
export class KatexFeature implements Feature {
    constructor(private _config: ThemeConfig) { }

    init(): void {
        if (this._config.math) {
            window.renderMathInElement(document.body, this._config.math);
        }
    }
}
