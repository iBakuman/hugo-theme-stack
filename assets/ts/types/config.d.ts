interface EchartsConfig {
    darkTheme: object;
    lightTheme: object;
    data: object;
}

interface FoldingConfig {
    maxShownLines: number
}

interface CodeConfig {
    copyTitle: string
}

interface ThemeConfig {
    folding: FoldingConfig;
    echarts: EchartsConfig;
    code: CodeConfig;
}

interface Window {
    themeConfig: ThemeConfig;
}
