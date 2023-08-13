// // export const locales = ['en', 'ar', 'ru'];
// export const i18n = {
//     // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//     defaultLocale: 'en',
//     locales: ['en', 'ar'],
// }
// export const config = {
//     // Skip all paths that should not be internationalized. This example skips the
//     // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//     matcher: ['/((?!api|_next|.*\\..*).*)']
// };
// export type Locale = (typeof i18n)['locales'][number]


export const i18n = {
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'en',
    locales: ['en', 'ar'],
}

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)']
};