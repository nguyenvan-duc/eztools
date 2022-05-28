import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'

const HeadSeo = ({title}) => {
  return (
    <Head>
        <title>{title}</title>
    </Head>
  )
}

export default HeadSeo