import { Util } from "ts/util/Utils";
import { Feature } from '../Feature';
import { ThemeStorage } from '../../storage/ThemeStorage';

export class EchartsFeature implements Feature {
    constructor(private _storage: ThemeStorage, private config: ThemeConfig) { }

    init(): void {
        if (window.echarts && this.config.echarts && this._storage) {
            window.echarts.registerTheme('dark', this.config.echarts.darkTheme)
            window.echarts.registerTheme('light', this.config.echarts.lightTheme)
            Util.forEach(document.querySelectorAll(".echarts"), echartsContainer => {
                const chart = window.echarts.init(echartsContainer,
                    this._storage.isDark() ? 'dark' : 'light', { renderer: 'svg' })
                chart.setOption(JSON.parse(this.config.echarts.data[echartsContainer.id]))
            })
        }
    }
}
