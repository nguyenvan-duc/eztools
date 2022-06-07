import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const HeadSeo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
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
  );
};

export default HeadSeo;
