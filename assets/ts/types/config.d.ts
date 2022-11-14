interface EchartsConfig {
    darkTheme: object;
    lightTheme: object;
    data: object;
}

interface FoldingConfig {
    maxShownLines: number;
}

interface CodeConfig {
    copyTitle: string;
}

interface MathConfig {
    delimiters: { display: boolean, left: string, right: string };
    strict: boolean;
}

interface ThemeConfig {
    folding: FoldingConfig;
    echarts: EchartsConfig;
    code: CodeConfig;
    math?: MathConfig;
}

interface Window {
    themeConfig: ThemeConfig;
}
