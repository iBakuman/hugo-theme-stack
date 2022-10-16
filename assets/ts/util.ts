export class Util {
  public static forEach(elements, handler) {
    elements = elements || [];
    for (let i = 0; i < elements.length; i++) handler(elements[i]);
  }

  public static getScrollTop() {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  }

  public static isMobile() {
    return window.matchMedia('only screen and (max-width: 680px)').matches;
  }

  public static isTocStatic() {
    return window.matchMedia('only screen and (max-width: 960px)').matches;
  }

  public static animateCSS(element: HTMLElement, animation: Array<string>, reserved: Boolean = false, callback?) {
    if (!Array.isArray(animation)) animation = [animation];
    element.classList.add('animate__animated', ...animation);
    const handler = () => {
      element.classList.remove('animate__animated', ...animation);
      element.removeEventListener('animationend', handler);
      if (typeof callback === 'function') callback();
    };
    if (!reserved) element.addEventListener('animationend', handler, false);
  }
}
