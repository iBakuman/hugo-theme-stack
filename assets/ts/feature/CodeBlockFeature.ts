import { Util } from 'ts/util/Utils';
import { Feature } from './Feature';

export class CodeBlockFeature implements Feature {

    constructor(private _config: ThemeConfig) { }

    init(): void {
        this.initHighlight();
        this.createTableWrapper();
        this.addScrollable();
    }

    initHighlight(): void {
        Util.forEach(document.querySelectorAll('.article-content .highlight > .chroma'), chroma => {
            const codeElements = chroma.querySelectorAll('pre.chroma > code');
            if (codeElements.length) {
                const codeEl = codeElements[codeElements.length - 1];

                const header = document.createElement('div');
                header.className = 'ibakuman-toolbar ' + codeEl.className.toLowerCase();
                const open = document.createElement('span');
                open.classList.add('ibakuman-toolbar__toggle-open');
                open.insertAdjacentHTML('afterbegin', '<i class="arrow fas fa-chevron-left fa-fw" aria-hidden="true"></i>');
                open.addEventListener('click', () => {
                    chroma.classList.toggle('open');
                }, false);
                header.appendChild(open);

                // 创建省略号
                const ellipses = document.createElement('span');
                ellipses.insertAdjacentHTML('afterbegin', '<i class="fas fa-ellipsis-h fa-fw" aria-hidden="true"></i>');
                ellipses.classList.add('ibakuman-toolbar__ellipses');
                ellipses.addEventListener('click', () => {
                    chroma.classList.add('open');
                }, false);
                header.appendChild(ellipses);

                // 创建复制按钮
                const copy = document.createElement('span');
                copy.insertAdjacentHTML('afterbegin', '<i class="far fa-copy fa-fw" aria-hidden="true"></i>');
                copy.classList.add('ibakuman-toolbar__copy');

                // 获得纯文本代码
                const code = codeEl.innerText;
                if (this._config.folding.maxShownLines < 0 || code.split('\n').length < this._config.folding.maxShownLines + 2) chroma.classList.add('open');
                if (this._config.code.copyTitle) {
                    copy.setAttribute('data-clipboard-text', code);
                    copy.title = this._config.code.copyTitle;
                    const clipboard = new window.ClipboardJS(copy);
                    new Object()
                    clipboard.on('success', _e => {
                        Util.animateCSS(codeEl, ['animate__flash']);
                    });
                    header.appendChild(copy);
                }
                chroma.insertBefore(header, chroma.firstChild);
            }
        })
    }

    createTableWrapper(): void {
        Util.forEach(document.querySelectorAll('.article-content .highlight table'), table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            table.parentElement.replaceChild(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    addScrollable(): void {
        var codeBlocks = document.querySelectorAll('.article-content .highlight > div.chroma')
        codeBlocks.forEach((codeBlock) => {
            const table = codeBlock.querySelector('div.table-wrapper > table')
            if (table && table.scrollWidth > table.clientWidth) {
                codeBlock.addEventListener('wheel', (event) => {
                    const wheelEvent = event as WheelEvent
                    event.preventDefault()
                    table.scrollLeft += wheelEvent.deltaY
                })
            }
        })
        var preTags = document.querySelectorAll('.article-content > pre')
        preTags.forEach((preTag) => {
            preTag.addEventListener('wheel', (event) => {
                if (preTag.scrollWidth > preTag.clientWidth) {
                    const wheelEvent = event as WheelEvent
                    event.preventDefault()
                    preTag.scrollLeft += wheelEvent.deltaY
                }
            })
        })
    }
}
