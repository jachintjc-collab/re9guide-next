import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Cinzel } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.re9guide.it.com'),
  title: {
    default: 'REQUIEM ARCHIVE — RE9 Survival Horror Walkthroughs & Guides',
    template: '%s · re9guide.it.com',
  },
  description:
    'The definitive fan archive for Resident Evil Requiem (RE9): area walkthroughs for Wrenwood, Rhodes Hill, Raccoon City and the ARK Facility, boss tier lists, and featured survival guides.',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ko: '/ko/',
    },
  },
  openGraph: {
    title: 'REQUIEM ARCHIVE — RE9 Survival Horror Walkthroughs & Guides',
    description:
      'Independent fan-made guide for Resident Evil: Requiem (RE9) — boss strategies, collectibles, weapons, trophies, lore.',
    url: 'https://www.re9guide.it.com',
    siteName: 're9guide.it.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REQUIEM ARCHIVE — RE9 Survival Horror Walkthroughs & Guides',
    description: 'Independent fan-made guide for Resident Evil: Requiem.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'google-site-verification': '450_eOmCEy1bJaABBR9sm0fq9D1xQG93sfFiyhHyB3Y',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1310',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} bg-background`}
    >
      <head>
        {/* DNS prefetch + preconnect — Core Web Vitals */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//5gvci.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="" />
      </head>
      <body className="font-sans antialiased">
        {children}

        {/* 所有第三方脚本只在 production 加载，本地 dev 干净不报错 */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google AdSense */}
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3033025151379385"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />

            {/* Google Analytics 4 */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-XZJHDN44CF"
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-XZJHDN44CF', { anonymize_ip: true });
              `}
            </Script>

            {/* Microsoft Clarity */}
            <Script id="clarity-init" strategy="afterInteractive">
              {`
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "wu58ps8e48");
              `}
            </Script>

            {/* Monetag service worker registration */}
            <Script id="monetag-sw" strategy="afterInteractive">
              {`
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js').catch(function(e){
                    console.error('SW reg failed', e);
                  });
                }
              `}
            </Script>

            {/* Cookie consent banner — EU/UK/CA GDPR + AdSense compliance */}
            <Script
              src="/cookie-consent.js"
              strategy="afterInteractive"
            />

            <Analytics />
          </>
        )}
      </body>
    </html>
  )
}
