import { Util } from "../util";

export function initTabs() {
    Util.forEach(document.querySelectorAll('.ibakuman-tabs'), tabs => {
        // 展开 / 收起 按钮添加点击事件
        tabs.querySelector('.ibakuman-toolbar__toggle-open').addEventListener('click', () => {
            tabs.classList.toggle('open');
        }, false)

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
