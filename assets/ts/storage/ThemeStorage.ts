interface ColorCacheItem {
    hash: string,                        /// Regenerate color scheme when the image hash is changed
    DarkMuted: {
        hex: string,
        rgb: Number[],
        bodyTextColor: string
    },
    Vibrant: {
        hex: string,
        rgb: Number[],
        bodyTextColor: string
    }
}

declare global {
    type ThemeMode = 'light' | 'dark' | 'auto';
}

export class ThemeStorage {

    /* ========================= Theme Mode Config Item ========================= */
    private readonly _themeModeKey = 'StackColorScheme';
    // 当前启用的主题 亮色/暗色/自动
    private _themeMode: ThemeMode;
    private _sysPreferMode: ThemeMode;

    get themeMode(): ThemeMode {
        return this._themeMode;
    }

    set themeMode(themeMode: ThemeMode) {
        this._themeMode = themeMode;
        this._storage.setItem(this._themeModeKey, this._themeMode);
    }

    get sysPreferMode(): ThemeMode {
        return this._sysPreferMode;
    }

    set sysPreferMode(themeMode: ThemeMode) {
        this._sysPreferMode = themeMode;
    }

    // Returns whether the current theme is in dark mode.
    isDark(): boolean {
        return (this._themeMode == 'dark' ||
            this._themeMode == 'auto' && this._sysPreferMode == 'dark');
    }

    /* ======================= Theme Mode Config Item End ======================= */

    /* =========================== Vibrant Config Item ========================== */
    private readonly _colorCacheKey = 'StackColorsCache';
    private _colorCache: { [key: string]: ColorCacheItem } = {};
    get colorCache() {
        return this._colorCache;
    }

    saveColorCache(): void {
        this._storage.setItem(this._colorCacheKey, JSON.stringify(this._colorCache))
    }

    /* ========================= Vibrant Config Item End ======================== */

    /* ============================ Singleton Pattern =========================== */
    private static instance: ThemeStorage;

    private constructor(private _storage: Storage) {
        // 读取用户上次访问我博客时使用的主题模式
        if (_storage.hasOwnProperty(this._themeModeKey)) {
            const savedMode = _storage.getItem(this._themeModeKey);
            if (savedMode == 'light' || savedMode == 'dark' || savedMode == 'auto') {
                this._themeMode = savedMode;
            } else {
                this._themeMode = 'auto';
            }
        }

        if (_storage.hasOwnProperty(this._colorCacheKey)) {
            try {
                this._colorCache = JSON.parse(_storage.getItem(this._colorCacheKey));
            }
            catch (e) {
                this._colorCache = {};
            }
        }
    }

    static newInstance(storage: Storage) {
        if (!this.instance) {
            this.instance = new ThemeStorage(storage);
        }
        return this.instance;
    }
    /* ========================== Singleton Pattern End ========================= */
}
