/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
/* ================================= Imports ================================ */
import { AdmonitionFeature } from 'ts/feature/shortcode/AdmonitionFeature';
import { CodeBlockFeature } from 'ts/feature/CodeBlockFeature';
import { EchartsFeature } from './feature/shortcode/EchartsFeature';
import { Feature } from './feature/Feature';
import { MobileMenuFeature } from 'ts/feature/MobileMenuFeature';
import { PhotoSwipeFeature } from './feature/vendor/PhotoSwipeFeature';
import { StackThemeMode } from 'ts/StackThemeMode';
import { TabsFeature } from 'ts/feature/shortcode/TabsFeature';
import { ThemeStorage } from './storage/ThemeStorage';
import { VibrantFeature } from './feature/vendor/VibrantFeature';
import { setupScrollspy } from 'ts/scrollspy';
import { setupSmoothAnchors } from 'ts/smoothAnchors';
import { KatexFeature } from './feature/vendor/KatexFeature';
/* =============================== Imports End ============================== */

class Stack {
    private features: Feature[]

    constructor(private config: ThemeConfig, private window: Window) { }

    init(): void {

        const articleContent = document.querySelector('.article-content') as HTMLElement;
        if (articleContent) {
            new PhotoSwipeFeature(articleContent);
            setupSmoothAnchors();
            setupScrollspy();
        }

        const storage = ThemeStorage.newInstance(localStorage);

        const themeMode = new StackThemeMode(storage, document.getElementById('dark-mode-toggle'));

        this.features = [
            new AdmonitionFeature(),
            new EchartsFeature(storage, this.config),
            new MobileMenuFeature(),
            new CodeBlockFeature(this.config),
            new TabsFeature(this.config),
            new VibrantFeature(storage),
            new KatexFeature(this.config)
        ];

        for (const feature of this.features) {
            feature.init();
        }
    }
}

/**
 * MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event
 * load 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。
 * 它与 DOMContentLoaded 不同，后者只要页面 DOM 加载完成就触发，无需等待依赖资源的加载。
 * The load event is fired when the whole page has loaded, including all dependent
 * resources such as stylesheets and images. This is in contrast to DOMContentLoaded,
 * which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
 */
window.addEventListener('load', () => {
    setTimeout(function () {
        new Stack(window.themeConfig, window).init();
    }, 0);
})

/* =========================== NProgress Configure ========================== */

if (window.NProgress) {
    document.addEventListener('readystatechange', () => {
        window.NProgress.start();
        console.log('init nprogress...');
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'interactive') window.NProgress.inc(0.8);
            if (document.readyState === 'complete') window.NProgress.done();
        })
    })
}

/* ========================= NProgress Configure End ======================== */


/**
 * createElement
 * Edited from:
 * @link https://stackoverflow.com/a/42405694
 */
function createElement(tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
        if (name && attrs.hasOwnProperty(name)) {
            let value = attrs[name];

            if (name == "dangerouslySetInnerHTML") {
                element.innerHTML = value.__html;
            }
            else if (value === true) {
                element.setAttribute(name, name);
            } else if (value !== false && value != null) {
                element.setAttribute(name, value.toString());
            }
        }
    }
    for (let i = 2; i < arguments.length; i++) {
        let child = arguments[i];
        if (child) {
            element.appendChild(
                child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
        }
    }
    return element;
}
window.createElement = createElement;
