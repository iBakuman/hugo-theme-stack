import { Util } from "../util";

export function initTabs() {
    Util.forEach(document.querySelectorAll('.ibakuman-tabs'), tabs => {
        // 展开 / 收起 按钮添加点击事件
        tabs.querySelector('.ibakuman-toolbar__toggle-open').addEventListener('click', () => {
            tabs.classList.toggle('open');
        }, false)

        // 只考虑第一个 tab 的长度。
        const contentEl = tabs.querySelector('.ibakuman-tabs__content');
        if (contentEl) {
            // 不能直接向下面这样获取 content，因为如果第一个 tab 包含的是代码块，则行号部分也会计入。
            // const content = contentEl.innerText;

            const codeEls = contentEl.querySelectorAll('pre.chroma > code');
            let content = ''
            if (codeEls.length) {
                // 此时第一个 tab 包含的是代码块，取 codeEls 的最后一个元素，该元素的 innerText 保存的是代码。
                content = codeEls[codeEls.length - 1].innerText;
            } else {
                content = contentEl.innerText;
            }

            if (window.themeConfig.folding.maxShownLines < 0
                || content.split('\n').length < window.themeConfig.folding.maxShownLines + 2) {
                // 内容行数小于在 config.yaml 中配置的可折叠区域的最大显示行数时，展开内容（默认是收起的）。
                tabs.classList.add('open');
            }
        }

        // 当前 tabs 的 id
        const id = tabs.id
        // 代码复制按钮
        const copyBtn = tabs.querySelector('.ibakuman-toolbar__copy');

        if (window.themeConfig.code.copyTitle) {
            copyBtn.title = window.themeConfig.code.copyTitle;
            copyBtn.setAttribute('data-clipboard-target', `#${id} > input:checked + label + .ibakuman-tabs__content`);
            // @ts-ignore
            const clipboard = new ClipboardJS(copyBtn);
            clipboard.on('success', (e) => {
                e.clearSelection();
                let contentEl = tabs.querySelectorAll(`#${id} > input:checked + label + .ibakuman-tabs__content pre.chroma > code`);
                // NOTE: 不能通过判断 !contentEl 来决定是否执行逻辑，因为 contentEl 的数据类型是 NodeList，
                // 数组类型和 NodeList 类型的 !contentEl 总是返回 false。
                if (0 == contentEl.length) {
                    // 当前复制的内容是普通文本。
                    contentEl = tabs.querySelector(`#${id} > input:checked + label + .ibakuman-tabs__content`);
                } else {
                    // 当前复制内容是代码块，此时取代码部分，不要让行号部分也有动画效果。
                    contentEl = contentEl[contentEl.length - 1]
                }
                if (contentEl) {
                    Util.animateCSS(contentEl, ['animate__flash'])
                }
            })
        }
    })
}
