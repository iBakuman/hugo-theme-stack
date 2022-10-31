import { Util } from 'ts/util';

type Action = 'cut' | 'copy';
type Response = 'success' | 'error';
type CopyActionOptions = {
  container?: Element;
};

declare namespace ClipboardJS {
  interface Options {
    /**
     * Overwrites default command ('cut' or 'copy').
     * @param elem Current element
     */
    action?(elem: Element): Action;

    /**
     * Overwrites default target input element.
     * @param elem Current element
     * @returns <input> element to use.
     */
    target?(elem: Element): Element;

    /**
     * Returns the explicit text to copy.
     * @param elem Current element
     * @returns Text to be copied.
     */
    text?(elem: Element): string;

    /**
     * For use in Bootstrap Modals or with any
     * other library that changes the focus
     * you'll want to set the focused element
     * as the container value.
     */
    container?: Element;
  }

  interface Event {
    action: string;
    text: string;
    trigger: Element;
    clearSelection(): void;
  }
}

declare global {
  interface Window {
    themeConfig: any;
  }

  class ClipboardJS {
    constructor(
      selector: string | Element | NodeListOf<Element>,
      options?: ClipboardJS.Options
    );

    /**
     * Subscribes to events that indicate the result of a copy/cut operation.
     * @param type Event type ('success' or 'error').
     * @param handler Callback function.
     */
    on(type: Response, handler: (e: ClipboardJS.Event) => void): this;

    on(type: string, handler: (...args: any[]) => void): this;

    /**
     * Clears all event bindings.
     */
    destroy(): void;

    /**
     * Checks if clipboard.js is supported
     */
    static isSupported(): boolean;


    /**
     * Fires a copy action
     */
    static copy(target: string | Element, options?: CopyActionOptions): string;

    /**
    * Fires a cut action
    */
    static cut(target: string | Element): string;
  }
}

function initHighlight() {
  // Util.forEach(document.querySelectorAll('.highlight > pre.chroma'), preChroma => {
  //   const chroma = document.createElement('div');
  //   chroma.className = preChroma.className;
  //   const table = document.createElement('table');
  //   chroma.appendChild(table);
  //   const tbody = document.createElement('tbody');
  //   table.appendChild(tbody);
  //   const tr = document.createElement('tr');
  //   tbody.appendChild(tr);
  //   const td = document.createElement('td');
  //   tr.appendChild(td);
  //   preChroma.parentElement.replaceChild(chroma, preChroma);
  //   td.appendChild(preChroma);
  // });
  Util.forEach(document.querySelectorAll('.article-content > .highlight > .chroma'), chroma => {
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
      if (window.themeConfig.code.maxShownLines < 0 || code.split('\n').length < window.themeConfig.code.maxShownLines + 2) chroma.classList.add('open');
      if (window.themeConfig.code.copyTitle) {
        copy.setAttribute('data-clipboard-text', code);
        copy.title = window.themeConfig.code.copyTitle;
        const clipboard = new ClipboardJS(copy);
        clipboard.on('success', _e => {
          Util.animateCSS(codeEl, ['animate__flash']);
        });
        header.appendChild(copy);
      }
      chroma.insertBefore(header, chroma.firstChild);
    }
  });
}

function initTable() {
  Util.forEach(document.querySelectorAll('.article-content > .highlight table'), table => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentElement.replaceChild(wrapper, table);
    wrapper.appendChild(table);
  });
}

export { initHighlight, initTable };
