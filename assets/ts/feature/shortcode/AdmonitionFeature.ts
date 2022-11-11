import { Util } from "ts/util/Utils";
import { Feature } from '../Feature';

export class AdmonitionFeature implements Feature {
    init(): void {
        Util.forEach(document.getElementsByClassName('details'), details => {
            const summary = details.getElementsByClassName('details-summary')[0];
            summary.addEventListener('click', () => {
                details.classList.toggle('open');
            }, false);
        });
    }
}
