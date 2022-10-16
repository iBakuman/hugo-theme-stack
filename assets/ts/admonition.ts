import { Util } from "./util";

export function initAdmonition() {
  Util.forEach(document.getElementsByClassName('details'), $details => {
    const $summary = $details.getElementsByClassName('details-summary')[0];
    $summary.addEventListener('click', () => {
      $details.classList.toggle('open');
    }, false);
  });
}
