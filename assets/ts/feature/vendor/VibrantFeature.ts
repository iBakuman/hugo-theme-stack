import { Feature } from '../Feature';
import { ThemeStorage } from '../../storage/ThemeStorage';

export class VibrantFeature implements Feature {

    constructor(private _storage: ThemeStorage) { }

    init(): void {
        if (!window.Vibrant) return;
        // Add linear gradient background to tile style article
        const articleTile = document.querySelector('.article-list--tile');
        if (articleTile) {
            // @ts-ignore
            let observer = new IntersectionObserver(async (entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    observer.unobserve(entry.target);

                    const articles = entry.target.querySelectorAll('article.has-image');
                    articles.forEach(async articles => {
                        const image = articles.querySelector('img'),
                            imageURL = image.src,
                            key = image.getAttribute('data-key'),
                            hash = image.getAttribute('data-hash'),
                            articleDetails: HTMLDivElement = articles.querySelector('.article-details');

                        const colors = await this.getColor(key, hash, imageURL);

                        articleDetails.style.background = `
                        linear-gradient(0deg,
                            rgba(${colors.DarkMuted.rgb[0]}, ${colors.DarkMuted.rgb[1]}, ${colors.DarkMuted.rgb[2]}, 0.5) 0%,
                            rgba(${colors.Vibrant.rgb[0]}, ${colors.Vibrant.rgb[1]}, ${colors.Vibrant.rgb[2]}, 0.75) 100%)`;
                    })
                })
            });

            observer.observe(articleTile)
        }
    }

    async getColor(key: string, hash: string, imageURL: string) {
        if (!key) {
            // If no key is provided, do not cache the result
            return await window.Vibrant.from(imageURL).getPalette();
        }

        if (!this._storage.colorCache.hasOwnProperty(key) || this._storage.colorCache[key].hash !== hash) {
            // If key is provided, but not found in cache, or the hash mismatches => Regenerate color scheme
            const palette = await window.Vibrant.from(imageURL).getPalette();
            this._storage.colorCache[key] = {
                hash: hash,
                Vibrant: {
                    hex: palette.Vibrant.hex,
                    rgb: palette.Vibrant.rgb,
                    bodyTextColor: palette.Vibrant.bodyTextColor
                },
                DarkMuted: {
                    hex: palette.DarkMuted.hex,
                    rgb: palette.DarkMuted.rgb,
                    bodyTextColor: palette.DarkMuted.bodyTextColor
                }
            }
            // Save colors into localStorage
            this._storage.saveColorCache();
        }

        return this._storage.colorCache[key];
    }
}
