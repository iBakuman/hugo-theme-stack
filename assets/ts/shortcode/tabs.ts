import {Util} from "../util";

export function initTabs() {
    Util.forEach(document.querySelectorAll('.ibakuman-tabs'), tabs => {
        // debugger
        tabs.querySelector('.btn-wrapper > .toggle-open').addEventListener('click', ()=>{
            tabs.classList.toggle('open');
        }, false)
    })
}