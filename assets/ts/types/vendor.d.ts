interface NProgress {
    inc: (number) => void;
    start: () => void;
    done: () => void;
}

interface PhotoSwipeItem {
    w: number;
    h: number;
    src: string;
    msrc: string;
    title?: string;
    el: HTMLElement;
}

interface Vibrant {
    static from(src: any): any;
}

interface ClipboardJS {
    new(selector: string | Element | NodeListOf<Element>, options?: object): ClipboardJS;

    /**
     * Subscribes to events that indicate the result of a copy/cut operation.
     * @param type Event type ('success' or 'error').
     * @param handler Callback function.
     */
    on(type: string, handler: (...args: any[]) => void): this;
}

interface Window {

    createElement: any;

    /* ========= Objects Injected Into Window By Third - Party Libraries ======== */
    NProgress?: NProgress;
    echarts?: any;
    Vibrant?: Vibrant;

    ClipboardJS: ClipboardJS;

    PhotoSwipe: any;
    PhotoSwipeUI_Default: any;

    renderMathInElement(el: HTMLElement, config: MathConfig);
    /* ======= Objects Injected Into Window By Third - Party Libraries End ====== */
}

