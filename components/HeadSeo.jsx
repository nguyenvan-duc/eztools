import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Script from "next/script";
const HeadSeo = ({ title, desc, img }) => {
  const router = useRouter();
  const { asPath } = router;
  let href = "https://congcu.vercel.app" + asPath;
  return (
    <>
      <Head>
        <title>{title}</title>git 
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content={desc} />
        <meta itemProp="image" content={img} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={href} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={img} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta property="twitter:url" content={href} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={img} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={href}/>
        <link rel="shortcut icon" href={"/favicon.ico"} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={"apple-touch-icon.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={"favicon-32x32.png"}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={"favicon-16x16.png"}
        />
        <link rel="manifest" href={"site.webmanifest"} />
        <link rel="mask-icon" href={"safari-pinned-tab.svg"} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="article" />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DKMZDN7MHZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-DKMZDN7MHZ');
        `}
      </Script>
    </>
  );
};

export default HeadSeo;
