import { Feature } from './Feature';
// Control menu style on mobile devices
/**
 * Slide up/down
 * Code from https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
 * @param target
 * @param duration
 */

export class MobileMenuFeature implements Feature {
    init(): void {
        const toggleMenu = document.getElementById('toggle-menu');
        if (toggleMenu) {
            toggleMenu.addEventListener('click', () => {
                if (document.getElementById('main-menu').classList.contains('transiting')) return;
                document.body.classList.toggle('show-menu');
                this.slideToggle(document.getElementById('main-menu'), 300);
                toggleMenu.classList.toggle('is-active');
            });
        }
    }

    private slideToggle(target, duration = 500): void {
        if (window.getComputedStyle(target).display === 'none') {
            return this.slideDown(target, duration);
        } else {
            return this.slideUp(target, duration);
        }
    }

    private slideUp(target: HTMLElement, duration = 500): void {
        target.classList.add('transiting');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        ///target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        window.setTimeout(() => {
            target.classList.remove('show')
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('transiting');
        }, duration);
    }

    private slideDown(target: HTMLElement, duration = 500): void {
        target.classList.add('transiting');
        target.style.removeProperty('display');

        target.classList.add('show');

        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = "0";
        target.style.paddingTop = "0";
        target.style.paddingBottom = "0";
        target.style.marginTop = "0";
        target.style.marginBottom = "0";
        target.offsetHeight;
        ///target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('transiting');
        }, duration);
    }
}
