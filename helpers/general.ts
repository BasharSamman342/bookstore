import { i18n, Locale } from "@/i18n-config";
export const toAuthUrl = (url: string, lang = 'en') => {
    var prefix = '';
    if (i18n.defaultLocale !== lang)
        prefix = '/' + lang;
    return prefix + ((url !== '/') ? '/' + url : '');
}

export const toUrl = (url: string, lang = 'en') => {
    return '/' + lang + '/' + url;
}