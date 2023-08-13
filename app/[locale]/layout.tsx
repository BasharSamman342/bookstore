import { NextIntlClientProvider } from "next-intl";


export function generateStaticParams() {
    return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({children,params: { locale }}) {
    let messages;
    try {
        messages = (await import(`@/dictionaries/${locale}.json`)).default;
    } catch (error) {
        console.log("error", error);
    }
    return (
        <html lang={locale}>
        <body suppressHydrationWarning={true} style={{ margin: 0 }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
